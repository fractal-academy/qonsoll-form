const smallImageSize = { width: '250px', height: '400px' }
const imageFullSize = { width: '100%', height: '100%' }
const imageBetweenSize = { width: '150px', height: '200px' }
const LAYOUT_TYPES = {
  DEFAULT: { type: 'default' },
  BETWEEN: { type: 'Between', imgSize: imageBetweenSize },
  LEFT_SIDE_SMALL: { type: 'Left side small', imgSize: smallImageSize },
  LEFT_SIDE_BIG: { type: 'Left side big', imgSize: imageFullSize },
  RIGHT_SIDE_SMALL: { type: 'Right side small', imgSize: smallImageSize },
  RIGHT_SIDE_BIG: { type: 'Right side big', imgSize: imageFullSize },
  FULL_SCREEN: { type: 'Fullscreen' }
}

const LAYOUT_TYPE_KEYS = Object.keys(LAYOUT_TYPES)
const LAYOUT_TYPE_VALUES = Object.values(LAYOUT_TYPES)

export { LAYOUT_TYPE_KEYS, LAYOUT_TYPE_VALUES }
export default LAYOUT_TYPES
