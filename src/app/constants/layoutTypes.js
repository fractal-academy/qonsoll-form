const smallImageSize = { width: '150px', height: '200px' }

const LAYOUT_TYPE = {
  FULL_SCREEN: 'Fullscreen',
  BETWEEN: smallImageSize,
  LEFT_SIDE_SMALL: smallImageSize,
  RIGHT_SIDE_SMALL: smallImageSize,
  LEFT_SIDE_BIG: { width: '100%', height: '100%' },
  RIGHT_SIDE_BIG: { width: '100%', height: '100%' }
}

const LAYOUT_TYPE_KEYS = Object.keys(LAYOUT_TYPE)
const LAYOUT_TYPE_VALUE = Object.values(LAYOUT_TYPE)

export default LAYOUT_TYPE
export { LAYOUT_TYPE_KEYS, LAYOUT_TYPE_VALUE }
