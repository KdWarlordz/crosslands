import axios from 'axios'

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface RegisteredFunction {
  endpoint: string
  options: AxiosRequestConfig
  staleTime: number
}

interface CacheData {
  data: any
  expiry: number
  endpoint: string
  options: AxiosRequestConfig
  staleTime: number
}

class ServerQueryCache {
  apiRoot: string
  cache: Map<string, CacheData>
  registeredFunctions: { [key: string]: RegisteredFunction }

  constructor(apiRoot: string) {
    this.apiRoot = apiRoot
    this.cache = new Map<string, CacheData>()
    this.registeredFunctions =
      this._loadRegisteredFunctionsFromLocalStorage() || {}
    this._loadCacheFromLocalStorage()
  }

  async fetchData(
    key: string,
    endpoint: string,
    options: AxiosRequestConfig,
    staleTime: number = 0,
    invalidateKeys: Array<{
      key: string
      options?: AxiosRequestConfig
      staleTime?: number
    }> = [],
    forceInvalidate: boolean = false
  ): Promise<any> {
    if (!this.registeredFunctions[key]) {
      this.registeredFunctions[key] = { endpoint, options, staleTime }
      this._saveRegisteredFunctionsToLocalStorage()
    }

    const cacheKey = this._generateCacheKey(endpoint, options)
    const currentTime = new Date().getTime()

    if (!forceInvalidate && this.cache.has(cacheKey)) {
      const { data, expiry } = this.cache.get(cacheKey)!
      if (currentTime < expiry || expiry === 0) {
        return data
      }
    }

    const response: AxiosResponse = await axios({
      url: `${this.apiRoot}${endpoint}`,
      ...options
    })

    const expiry = staleTime === 0 ? 0 : currentTime + staleTime
    const cacheData = {
      data: response.data,
      expiry,
      endpoint,
      options,
      staleTime
    }
    this.cache.set(cacheKey, cacheData)
    this._saveCacheToLocalStorage()

    for (const invalidateKey of invalidateKeys) {
      const {
        key,
        options: invalidateOptions,
        staleTime: invalidateStaleTime
      } = invalidateKey
      const registeredFunction = this.registeredFunctions[key]
      if (registeredFunction) {
        const {
          endpoint: invalidateEndpoint,
          options: storedOptions,
          staleTime: storedStaleTime
        } = registeredFunction
        const finalOptions = invalidateOptions || storedOptions
        const finalStaleTime =
          invalidateStaleTime !== undefined
            ? invalidateStaleTime
            : storedStaleTime
        this.invalidateCache(invalidateEndpoint, finalOptions)
        await this.fetchData(
          key,
          invalidateEndpoint,
          finalOptions,
          finalStaleTime,
          [],
          forceInvalidate
        )
      }
    }

    return response.data
  }

  async invalidateSingleCall(
    key: string,
    forceInvalidate: boolean = true
  ): Promise<any> {
    const registeredFunction = this.registeredFunctions[key]
    if (registeredFunction) {
      const { endpoint, options, staleTime } = registeredFunction
      this.invalidateCache(endpoint, options)
      return await this.fetchData(
        key,
        endpoint,
        options,
        staleTime,
        [],
        forceInvalidate
      )
    }
  }

  async invalidateMultipleCalls(
    keys: string[],
    forceInvalidate: boolean = true
  ): Promise<any[]> {
    const results = []
    for (const key of keys) {
      const registeredFunction = this.registeredFunctions[key]
      if (registeredFunction) {
        const { endpoint, options, staleTime } = registeredFunction
        this.invalidateCache(endpoint, options)
        const result = await this.fetchData(
          key,
          endpoint,
          options,
          staleTime,
          [],
          forceInvalidate
        )
        results.push(result)
      }
    }
    return results
  }

  invalidateCache(endpoint: string, options: AxiosRequestConfig | null = null) {
    const cacheKey = options
      ? this._generateCacheKey(endpoint, options)
      : this._findCacheKeyByEndpoint(endpoint)
    if (cacheKey && this.cache.has(cacheKey)) {
      this.cache.delete(cacheKey)
      this._saveCacheToLocalStorage()
    }
  }

  _generateCacheKey(endpoint: string, options: AxiosRequestConfig): string {
    return JSON.stringify({ endpoint, ...options })
  }

  _findCacheKeyByEndpoint(endpoint: string): string | null {
    for (let key of this.cache.keys()) {
      if (key.includes(endpoint)) {
        return key
      }
    }
    return null
  }

  _saveCacheToLocalStorage() {
    const cacheToSave = Array.from(this.cache.entries())
    localStorage.setItem('apiCache', JSON.stringify(cacheToSave))
  }

  _loadCacheFromLocalStorage() {
    const cacheData: [string, CacheData][] = JSON.parse(
      localStorage.getItem('apiCache') || '[]'
    )
    const currentTime = new Date().getTime()

    cacheData.forEach(([key, value]) => {
      if (currentTime < value.expiry || value.expiry === 0) {
        this.cache.set(key, value)
      }
    })
  }

  _saveRegisteredFunctionsToLocalStorage() {
    localStorage.setItem(
      'registeredFunctions',
      JSON.stringify(this.registeredFunctions)
    )
  }

  _loadRegisteredFunctionsFromLocalStorage(): {
    [key: string]: RegisteredFunction
  } | null {
    const stored = localStorage.getItem('registeredFunctions')
    return stored ? JSON.parse(stored) : null
  }
}

export default new ServerQueryCache('http://localhost:8888/api')
