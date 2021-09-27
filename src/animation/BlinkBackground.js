import { css } from 'styled-components'

const blinkBackground = css`
  @keyframes blinkBackground {
    0% {
      background-color: var(--ql-color-accent1-t-lighten3);
    }
    25% {
      background-color: var(--ql-color-accent1-t-lighten1);
    }
    50% {
      background-color: var(--ql-color-accent1-t-lighten3);
    }
    75% {
      background-color: var(--ql-color-accent1-t-lighten1);
    }
    100% {
      background-color: var(--ql-color-accent1-t-lighten3);
    }
  }
`
export default blinkBackground
