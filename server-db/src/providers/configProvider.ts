import { ConfigModel } from '../models/configModel.js'
import connectDB from '../dbConnector.js'
import { IConfig } from '../models/configModel.js'

export class ConfigProvider {
  static async getConfig(): Promise<IConfig | null> {
    await connectDB()
    return await ConfigModel.findOne().lean()
  }

  static async saveConfig(data: IConfig): Promise<IConfig | null> {
    await connectDB()
    return await ConfigModel.findOneAndUpdate({}, data, {
      new: true,
      upsert: true
    }).lean()
  }
}
