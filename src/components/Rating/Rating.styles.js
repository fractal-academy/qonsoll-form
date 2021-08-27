import typeformTheme from '../../../styles/theme'
import styled from 'styled-components'
import { Rate } from 'antd'

export const StyledRate = styled(Rate)`
  &.ant-rate {
    font-size: ${({ phoneSize, tabletSize, count }) =>
      phoneSize && count < 5
        ? '50px'
        : phoneSize && count > 6 && count < 9
        ? '35px'
        : phoneSize && count > 8
        ? '25px'
        : tabletSize
        ? '45px'
        : '50px'};
    color: ${({ theme }) =>
      theme?.color?.primary?.default || typeformTheme?.color?.primary?.default};
  }
`
