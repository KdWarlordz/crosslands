import { ConfigProvider } from '../providers/configProvider.js';
export class ConfigService {
    static async getConfig() {
        return await ConfigProvider.getConfig();
    }
    static async saveConfig(data) {
        return await ConfigProvider.saveConfig(data);
    }
}
