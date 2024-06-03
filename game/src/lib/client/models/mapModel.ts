export type Chains =
  | 'kadena'
  | 'aptos'
  | 'alephium'
  | 'sui'
  | 'solana'
  | 'ethereum'
export type Planets = 'earth' | 'moon' | 'mars'

export interface Map {
  chain: Chains
  planet: Planets
  id: string
  seed: number[]
  matrix: any
}
