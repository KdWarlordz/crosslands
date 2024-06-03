import type { Chains, Planets } from './mapModel'

export interface IChain {
  name: string
  url: string
}

export interface IAvailableCrossland {
  chain: Chains
  world: Planets
  id: string
  openingsTime: Date
  sellDate: Date
  sellClose: Date
}

export interface IConfig {
  version: string
  chains: IChain[]
  worlds: Planets[]
  availableCrosslands: IAvailableCrossland[]
  activeChain: string
}
