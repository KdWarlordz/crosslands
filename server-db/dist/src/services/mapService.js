import { MapProvider } from '../providers/mapProvider.js';
export class MapService {
    static async getMatrixData(chain, planet, id) {
        return await MapProvider.getMatrixData(chain, planet, id);
    }
    static async saveMatrixData(data) {
        return await MapProvider.saveMatrixData(data);
    }
}
