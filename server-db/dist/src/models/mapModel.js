import mongoose, { Schema } from 'mongoose';
const MapEntitySchema = new Schema({
    type: { type: String, required: true },
    tileIndex: { type: Number, required: true },
    z: { type: Number, required: true },
    collide: { type: Boolean, required: true },
    solid: { type: Boolean, required: true },
    spawn: { type: [String], required: false }
});
const MapMatrixDataSchema = new Schema({
    chain: { type: String, required: true },
    planet: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    seed: { type: [Number], required: true },
    matrix: { type: [[MapEntitySchema]], required: true }
});
const MapMatrixDataModel = mongoose.model('MapMatrixData', MapMatrixDataSchema);
export { MapMatrixDataModel };
