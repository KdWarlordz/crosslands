import { MapProvider } from '../providers/mapProvider.js'
import type { MapMatrixData } from '../models/mapModel.js'

type Chains = 'kadena' | 'aptos' | 'alephium' | 'sui' | 'solana' | 'ethereum'
type Planets = 'earth' | 'moon' | 'mars'

export class MapService {
  static async getMatrixData(
    chain: Chains,
    planet: Planets,
    id: string
  ): Promise<MapMatrixData | null> {
    return await MapProvider.getMatrixData(chain, planet, id)
  }

  static async saveMatrixData(data: MapMatrixData): Promise<MapMatrixData> {
    return await MapProvider.saveMatrixData(data)
  }
}
