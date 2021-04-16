const smallImageSize = { width: '150px', height: '200px' }

const LAYOUT_TYPES = {
  FULL_SCREEN: 'Fullscreen',
  BETWEEN: smallImageSize,
  LEFT_SIDE_SMALL: smallImageSize,
  RIGHT_SIDE_SMALL: smallImageSize,
  LEFT_SIDE_BIG: { width: '100%', height: '100%' },
  RIGHT_SIDE_BIG: { width: '100%', height: '100%' }
}

const LAYOUT_TYPE_KEYS = Object.keys(LAYOUT_TYPES)
const LAYOUT_TYPE_VALUES = Object.values(LAYOUT_TYPES)

export default LAYOUT_TYPES
export { LAYOUT_TYPE_KEYS, LAYOUT_TYPE_VALUES }
