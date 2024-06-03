import { MapMatrixDataModel, MapMatrixData } from '../models/mapModel.js'
import type { Chains, Planets } from '../providers/interfaces.js'

export class MapProvider {
  static async getMatrixData(
    chain: Chains,
    planet: Planets,
    id: string
  ): Promise<MapMatrixData | null> {
    return await MapMatrixDataModel.findOne({ chain, planet, id }).lean()
  }

  static async saveMatrixData(data: MapMatrixData): Promise<MapMatrixData> {
    const newData = new MapMatrixDataModel(data)
    return await newData.save()
  }
}
