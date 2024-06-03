import { ConfigModel } from '../models/configModel.js';
import connectDB from '../dbConnector.js';
export class ConfigProvider {
    static async getConfig() {
        await connectDB();
        return await ConfigModel.findOne().lean();
    }
    static async saveConfig(data) {
        await connectDB();
        return await ConfigModel.findOneAndUpdate({}, data, {
            new: true,
            upsert: true
        }).lean();
    }
}
