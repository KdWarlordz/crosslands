import mongoose, { Document, Schema } from 'mongoose'

interface MapEntity extends Document {
  type: string
  tileIndex: number
  z: number
  collide: boolean
  solid: boolean
  spawn?: string[]
}

interface MapMatrixData extends Document {
  chain: string
  planet: string
  id: string
  seed: number[]
  matrix: MapEntity[][]
}

const MapEntitySchema: Schema = new Schema({
  type: { type: String, required: true },
  tileIndex: { type: Number, required: true },
  z: { type: Number, required: true },
  collide: { type: Boolean, required: true },
  solid: { type: Boolean, required: true },
  spawn: { type: [String], required: false }
})

const MapMatrixDataSchema: Schema = new Schema({
  chain: { type: String, required: true },
  planet: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  seed: { type: [Number], required: true },
  matrix: { type: [[MapEntitySchema]], required: true }
})

const MapMatrixDataModel = mongoose.model<MapMatrixData>(
  'MapMatrixData',
  MapMatrixDataSchema
)

export { MapMatrixDataModel, MapMatrixData, MapEntity }
