import theme from '../../../../../../styles/theme'
import styled from 'styled-components'
import { DatePicker, Select, Button, Typography } from 'antd'

const { Text } = Typography

export const CustomText = styled(Text)`
  color: ${theme.color.primary.default};
`

export const CustomButton = styled(Button)`
  background-color: ${theme.color.primary.t.lighten7};
`

export const StyledSelect = styled(Select)`
  margin-right: ${theme.space[2]};
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
export const StyledDatePicker = styled(DatePicker)`
  margin-right: ${theme.space[4]};
  width: 100%;
  background-color: ${theme.color.dark.t.lighten9};
  border: 1px solid ${theme.color.dark.t.lighten5};
  display: flex;
  align-items: center;
  .ant-picker-clear {
      border-radius: 50%;
      background-color: ${theme.color.dark.lighten8};
    }
  }
  .ant-select-clear {
    border-radius: 50%;
    font-size: 14px;
  }
`
