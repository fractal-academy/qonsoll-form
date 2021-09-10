import { css } from 'styled-components'

const blinkBackground = css`
  @keyframes blinkBackground {
    0% {
      background-color: var(--ql-color-accent1-t-lighten5);
    }
    25% {
      background-color: var(--ql-color-accent1-t-lighten2);
    }
    50% {
      background-color: var(--ql-color-accent1-t-lighten5);
    }
    75% {
      background-color: var(--ql-color-accent1-t-lighten2);
    }
    100% {
      background-color: var(--ql-color-accent1-t-lighten5);
    }
  }
`
export default blinkBackground
