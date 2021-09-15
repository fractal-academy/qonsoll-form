import styled from 'styled-components'
import { DatePicker, Select } from 'antd'
import { Text, Button } from '@qonsoll/react-design'

export const CustomText = styled(Text)`
  color: var(--qf-font-color-accent);
`

export const CustomButton = styled(Button)`
  background-color: var(--qf-button-bg);
  &:hover {
    background-color: var(--qf-button-hover);
  }
`

export const StyledSelect = styled(Select)`
  display: flex;
  align-items: center;
  .ant-select-clear {
    border-radius: 50%;
    font-size: var(--qf-typography-fs-body);
  }
  &:hover .ant-select-arrow {
    opacity: 0;
  }

  .ant-select-selector {
    cursor: pointer !important;
    background-color: var(--qf-condition-item-bg) !important;
    border-color: var(--qf-condition-item-border) !important;
  }
`
export const StyledDatePicker = styled(DatePicker)`
  flex: 1;
  cursor: pointer;
  border: 1px solid;
  display: flex;
  align-items: center;
  border-color: var(--qf-condition-item-border) !important;
  background-color: var(--qf-condition-item-bg) !important;

  .ant-picker-input input {
    cursor: pointer;
  }
  .ant-picker-clear {
    border-radius: 50%;
    background-color: var(--qf-condition-item-bg) !important;
  }
  .ant-select-clear {
    border-radius: 50%;
    font-size: var(--qf-typography-fs-body);
  }
`
