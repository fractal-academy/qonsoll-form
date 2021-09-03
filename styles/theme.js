// import './vars.css'
const theme = {}

//// SPACE
theme.space = [0, '4px', '8px', '16px', '32px', '64px']

//// GRID
theme.breakpoints = ['576px', '768px', '1024px', '1200px', '1600px']

theme.grid = {}
theme.grid.gutters = { xs: 16, sm: 16, md: 24, lg: 24, xl: 24, xxl: 32 }
theme.grid.paddings = [
  theme.grid.gutters.xs,
  theme.grid.gutters.sm,
  theme.grid.gutters.md,
  theme.grid.gutters.lg * 2,
  theme.grid.gutters.xl * 2,
  theme.grid.gutters.xxl * 2
]

//// COLORS
theme.color = {}

// Primary pure
theme.color.primary = {}
theme.color.primary.default = 'var(--primary-color)'
// theme.color.primary.lighten1 = '#1d6fdc'
// theme.color.primary.lighten2 = '#1d6fdc'
// theme.color.primary.lighten3 = '#1d6fdc'
// theme.color.primary.lighten4 = '#1d6fdc'
// theme.color.primary.lighten5 = '#1d6fdc'
theme.color.primary.lighten6 = '#e3eefa'
// theme.color.primary.lighten7 = '#1d6fdc'
// theme.color.primary.lighten8 = '#1d6fdc'

// Primary transparent
theme.color.primary.t = {}
theme.color.primary.t.lighten1 = 'var(--primary-t-lighten1)'
theme.color.primary.t.lighten2 = 'var(--primary-t-lighten2)'
theme.color.primary.t.lighten3 = 'var(--primary-t-lighten3)'
theme.color.primary.t.lighten4 = 'var(--primary-t-lighten4)'
theme.color.primary.t.lighten5 = 'var(--primary-t-lighten5)'
theme.color.primary.t.lighten6 = 'var(--primary-t-lighten6)'
theme.color.primary.t.lighten7 = 'var(--primary-t-lighten7)'
theme.color.primary.t.lighten8 = 'var(--primary-t-lighten8)'
theme.color.primary.t.lighten9 = 'var(--primary-t-lighten9)'

// Dark pure
theme.color.dark = {}
theme.color.dark.default = '#030b17'
theme.color.dark.lighten1 = '#424851'
// theme.color.dark.lighten2 = '#1d6fdc'
// theme.color.dark.lighten3 = '#1d6fdc'
// theme.color.dark.lighten4 = '#1d6fdc'
// theme.color.dark.lighten5 = '#1d6fdc'
// theme.color.dark.lighten6 = '#1d6fdc'
// theme.color.dark.lighten7 = '#1d6fdc'
theme.color.dark.lighten8 = '#f5f5f6'

// Dark transparent
theme.color.dark.t = {}
theme.color.dark.t.lighten1 = 'var(--dark-t-lighten1)'
theme.color.dark.t.lighten2 = 'var(--dark-t-lighten2)'
theme.color.dark.t.lighten3 = 'var(--dark-t-lighten3)'
theme.color.dark.t.lighten4 = 'var(--dark-t-lighten4)'
theme.color.dark.t.lighten5 = 'var(--dark-t-lighten5)'
theme.color.dark.t.lighten6 = 'var(--dark-t-lighten6)'
theme.color.dark.t.lighten7 = 'var(--dark-t-lighten7)'
theme.color.dark.t.lighten8 = 'var(--dark-t-lighten8)'
theme.color.dark.t.lighten9 = 'var(--dark-t-lighten9)'

// White pure
theme.color.white = {}
theme.color.white.default = 'var(--white)'

// theme.color.white.lighten1 = '#fff'
// theme.color.white.lighten2 = '#fff'
// theme.color.white.lighten3 = '#fff'
// theme.color.white.lighten4 = '#fff'
// theme.color.white.lighten5 = '#fff'
// theme.color.white.lighten6 = '#fff'
// theme.color.white.lighten7 = '#fff'
// theme.color.white.lighten8 = '#fff'

// White transparent
theme.color.white.t = {}
theme.color.white.t.lighten1 = 'var(--white-t-lighten1)'
theme.color.white.t.lighten2 = 'var(--white-t-lighten2)'
theme.color.white.t.lighten3 = 'var(--white-t-lighten3)'
theme.color.white.t.lighten4 = 'var(--white-t-lighten4)'
theme.color.white.t.lighten5 = 'var(--white-t-lighten5)'
theme.color.white.t.lighten6 = 'var(--white-t-lighten6)'
theme.color.white.t.lighten7 = 'var(--white-t-lighten7)'
theme.color.white.t.lighten8 = 'var(--white-t-lighten8)'
theme.color.white.t.lighten9 = 'var(--white-t-lighten9)'

// Danger pure
theme.color.danger = {}
theme.color.danger.default = 'var(--red-base)'

// Danger transparent
theme.color.danger.t = {}
theme.color.danger.t.lighten = 'rgba(255,0,0,0.15)'

// Text colors
theme.color.text = {}

// Text dark
theme.color.text.dark = {}
// theme.color.text.dark.primary = theme.color.dark.t.lighten1
theme.color.text.dark.primary = 'var(--text-color)'
theme.color.text.dark.secondary = 'var (--text-dark-secondary)'
theme.color.text.dark.disabled = theme.color.dark.t.lighten4

// Text light
theme.color.text.light = {}
theme.color.text.light.primary = 'var(--text-light-primary)'
theme.color.text.light.secondary = 'var(--text-light-secondary)'
theme.color.text.light.disabled = 'var(--text-light-disabled)'

//// GRADIENTS
theme.primaryGradient = 'linear-gradient(-45deg, #0D42B1, #247EE5)'

//// SHADOWS
theme.shadow = {}
theme.shadow.card =
  '0 3px 4px -4px rgba(3,11,23,0.12), 0 6px 12px 0 rgba(3,11,23,0.08), 0 0px 32px 0px rgba(3,11,23,0.05)'
theme.shadow.appNav = `2px 0 2px 0 ${theme.color.dark.t.lighten3}, -3px 0 16px 10px ${theme.color.primary.t.lighten3}`

//// OUTLINE
theme.outline = {}
theme.outline.appNavAvatar = `0 0 0 2px ${theme.color.white.default}`

//// TRANSITION
theme.transition = {}
theme.transition.default = 'all 0.3s'

//// BORDER RADIUS
theme.borderRadius = {}
theme.borderRadius.md = 'var(--border-radius-base)'
theme.borderRadius.sm = 'var(--border-radius-xs)'

//// TYPOGRAPHY
theme.typography = {}

theme.typography.fontFamily = 'var(--font-family)'

// Font sizes
theme.typography.fontSize = {}
theme.typography.fontSize.h1 = 'var(--font-size-h1)'
theme.typography.fontSize.h2 = 'var(--font-size-h2)'
theme.typography.fontSize.h3 = 'var(--font-size-h3)'
theme.typography.fontSize.h4 = 'var(--font-size-h4)'
theme.typography.fontSize.h5 = 'var(--font-size-h5)'
theme.typography.fontSize.h6 = 'var(--font-size-h6)'
theme.typography.fontSize.overline = '12px'
theme.typography.fontSize.body1 = 'var(--font-size-body1)'
theme.typography.fontSize.body2 = 'var(--font-size-body2)'
theme.typography.fontSize.caption1 = 'var(--font-size-caption1)'
theme.typography.fontSize.caption2 = 'var(--font-size-caption2)'

// Line heights
theme.typography.lineHeight = {}
theme.typography.lineHeight.h1 = 'var(--line-height-h1)'
theme.typography.lineHeight.h2 = 'var(--line-height-h2)'
theme.typography.lineHeight.h3 = 'var(--line-height-h3)'
theme.typography.lineHeight.h4 = 'var(--line-height-h4)'
theme.typography.lineHeight.h5 = 'var(--line-height-h5)'
theme.typography.lineHeight.h6 = 'var(--line-height-h6)'
theme.typography.lineHeight.overline = 'var(--line-height-overline)'
theme.typography.lineHeight.body1 = 'var(--line-height-body1)'
theme.typography.lineHeight.body2 = 'var(--line-height-body1)'
theme.typography.lineHeight.caption1 = 'var(--line-height-caption1)'
theme.typography.lineHeight.caption2 = 'var(--line-height-caption1)'

// Font weights
theme.typography.fontWeight = {}
theme.typography.fontWeight.bold = 'var(--font-weight-bold)'
theme.typography.fontWeight.semibold = 'var(--font-weight-semibold)'
theme.typography.fontWeight.medium = 'var(--font-weight-medium)'
theme.typography.fontWeight.regular = 'var(--font-weight-regular)'
theme.typography.fontWeight.light = 'var(--font-weight-light)'

// Letter spacing
theme.typography.letterSpacing = {}
theme.typography.letterSpacing.overline = 0.6

export default theme
