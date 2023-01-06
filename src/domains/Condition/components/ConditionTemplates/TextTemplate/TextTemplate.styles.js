import { Button } from '@qonsoll/react-design'
import { DatePicker } from 'antd'
import styled from 'styled-components'

export const CustomButton = styled(Button)`
  color: var(--qf-typography-title-color);
  background-color: var(--qf-button-bg);
  &:hover {
    color: var(--qf-typography-title-color);
    background-color: var(--qf-button-bg-hover);
  }
`

export const StyledDatePicker = styled(DatePicker)`
  cursor: pointer;
  .ant-picker-clear {
    border-radius: 50%;
    background-color: var(--qf-condition-item-bg) !important;
  }
`
