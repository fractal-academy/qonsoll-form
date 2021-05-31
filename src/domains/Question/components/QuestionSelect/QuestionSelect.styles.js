import { Select } from 'antd'
import styled from 'styled-components'
import theme from '../../../../../styles/theme'

export const StyledSelect = styled(Select)`
  width: 100%;
  display: flex;
  align-items: center;
  .ant-select-clear {
    border-radius: 50%;
    font-size: 14px;
  }
  .ant-select-selector {
    background-color: ${theme.color.dark.t.lighten9} !important;
    border-color: ${theme.color.dark.t.lighten5} !important;
  }
`
