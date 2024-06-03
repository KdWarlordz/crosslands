import { ConfigProvider } from '../providers/configProvider.js'
import { IConfig } from '../models/configModel.js'

export class ConfigService {
  static async getConfig(): Promise<IConfig | null> {
    return await ConfigProvider.getConfig()
  }

  static async saveConfig(data: IConfig): Promise<IConfig | null> {
    return await ConfigProvider.saveConfig(data)
  }
}
