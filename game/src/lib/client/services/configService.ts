import { getActiveChainData } from '../helpers'
import serverQueryCache from '../sqc'

import type { IConfig } from '../models/configModel'

export async function getConfig() {
  const endpoint = '/config'
  const options = {
    method: 'GET'
  }

  try {
    console.log('Loading config...')
    const data = await serverQueryCache.fetchData(
      'loadConfig',
      endpoint,
      options,
      300000
    )
    console.log('Config loaded successfully...')
    return data
  } catch (error) {
    console.error('Config loading error....:', error)
    throw error
  }
}

export async function getActiveChainConfig() {
  const config = (await getConfig()) as IConfig
  return getActiveChainData(config)
}

export async function updateConfig(configData: IConfig) {
  const endpoint = '/config'
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(configData)
  }

  try {
    const response = await serverQueryCache.fetchData(
      'updateConfig',
      endpoint,
      options,
      300000
    )
    console.log('Config updated successfully....', response)
    return response
  } catch (error) {
    console.error('Config updating error...:', error)
    throw error
  }
}
