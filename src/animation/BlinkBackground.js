import { css } from 'styled-components'
import typeformTheme from '../../styles/theme'

const blinkBackground = css`
  @keyframes blinkBackground {
    0% {
      background-color: ${({ theme }) =>
        theme?.color?.primary?.t?.lighten5 ||
        typeformTheme?.color?.primary?.t?.lighten5};
    }
    25% {
      background-color: ${({ theme }) =>
        theme?.color?.primary?.t?.lighten2 ||
        typeformTheme?.color?.primary?.t?.lighten2};
    }
    50% {
      background-color: ${({ theme }) =>
        theme?.color?.primary?.t?.lighten5 ||
        typeformTheme?.color?.primary?.t?.lighten5};
    }
    75% {
      background-color: ${({ theme }) =>
        theme?.color?.primary?.t?.lighten2 ||
        typeformTheme?.color?.primary?.t?.lighten2};
    }
    100% {
      background-color: ${({ theme }) =>
        theme?.color?.primary?.t?.lighten5 ||
        typeformTheme?.color?.primary?.t?.lighten5};
    }
  }
`
export default blinkBackground
