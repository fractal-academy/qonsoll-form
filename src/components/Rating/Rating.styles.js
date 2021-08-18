import typeformTheme from '../../../styles/theme'
import styled from 'styled-components'
import { Rate } from 'antd'

export const StyledRate = styled(Rate)`
  &.ant-rate {
    font-size: ${({ phoneSize, tabletSize, count }) =>
      phoneSize ? '24px' : tabletSize ? '45px' : '60px'};
    color: ${({ theme }) =>
      theme?.color?.primary?.default || typeformTheme?.color?.primary?.default};
  }
`
