import serverQueryCache from '../sqc'

import type { Map, Chains, Planets } from '../models/mapModel'

export async function getMap(chain: Chains, planet: Planets, id: string) {
  const endpoint = `/chains/${chain}/${planet}/${id}`
  const options = {
    method: 'GET'
  }

  try {
    console.log('Loading map...')
    const data = await serverQueryCache.fetchData(
      'loadMap',
      endpoint,
      options,
      300000
    )
    console.log('Map loaded successfully...')
    return data
  } catch (error) {
    console.error('Map loading error....:', error)
    throw error
  }
}

export async function addWorld(data: Map) {
  const endpoint = '/addworld'
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(data)
  }

  try {
    const response = await serverQueryCache.fetchData(
      'addWorld',
      endpoint,
      options,
      300000
    )
    console.log('World added successfully....', response)
    return response
  } catch (error) {
    console.error('Map adding error...:', error)
    throw error
  }
}
