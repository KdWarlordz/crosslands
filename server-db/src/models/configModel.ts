import mongoose, { Schema, Document } from 'mongoose'

export interface IChain {
  name: string
  url: string
}

export interface IAvailableCrossland {
  chain: string
  world: string
  id: string
  openingsTime: Date
  sellDate: Date
  sellClose: Date
}

export interface IConfig extends Document {
  version: string
  chains: IChain[]
  worlds: string[]
  availableCrosslands: IAvailableCrossland[]
  activeChain: string
}

const chainSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
})

const crosslandSchema = new Schema({
  chain: { type: String, required: true },
  world: { type: String, required: true },
  id: { type: String, required: true },
  openingsTime: { type: Date, required: true },
  sellDate: { type: Date, required: true },
  sellClose: { type: Date, required: true }
})

const configSchema = new Schema({
  version: { type: String, required: true },
  chains: [chainSchema],
  worlds: [{ type: String, required: true }],
  availableCrosslands: [crosslandSchema],
  activeChain: { type: String, required: true }
})

export const ChainModel = mongoose.model('Chain', chainSchema)
export const CrosslandModel = mongoose.model('Crossland', crosslandSchema)
export const ConfigModel = mongoose.model('Config', configSchema)
