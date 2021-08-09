import theme from './theme'

const fs = theme?.typography?.fontSize?.body1.replace('px', '')
const spaceVertical = Number(fs) - 4
const spaceHorizontal = Number(fs) + 8

export const PopoverNegativeMarin = {
  v: -spaceVertical,
  h: -spaceHorizontal
}
