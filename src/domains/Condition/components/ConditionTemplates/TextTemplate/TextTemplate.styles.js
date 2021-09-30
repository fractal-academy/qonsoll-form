import { DatePicker } from 'antd'
import styled from 'styled-components'
import { Button } from '@qonsoll/react-design'

export const CustomButton = styled(Button)`
  color: var(--qf-typography-title-color);
  background-color: var(--qf-button-bg);
  &:hover {
    background-color: var(--qf-button-hover);
  }
`

export const StyledDatePicker = styled(DatePicker)`
  cursor: pointer;
  .ant-picker-clear {
    border-radius: 50%;
    background-color: var(--qf-condition-item-bg) !important;
  }
`
