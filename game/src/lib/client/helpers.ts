import type { IConfig, IAvailableCrossland } from './models/configModel'

export function getActiveChainData(
  config: IConfig
): IAvailableCrossland | undefined {
  const { activeChain, availableCrosslands } = config
  return availableCrosslands.find(
    (crossland) => crossland.chain === activeChain
  )
}
