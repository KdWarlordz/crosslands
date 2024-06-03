import { MapMatrixDataModel } from '../models/mapModel.js';
export class MapProvider {
    static async getMatrixData(chain, planet, id) {
        return await MapMatrixDataModel.findOne({ chain, planet, id }).lean();
    }
    static async saveMatrixData(data) {
        const newData = new MapMatrixDataModel(data);
        return await newData.save();
    }
}
