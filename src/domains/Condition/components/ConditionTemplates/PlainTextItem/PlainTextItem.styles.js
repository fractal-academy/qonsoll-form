import { Select } from 'antd'
import styled from 'styled-components'
import { Input } from '@qonsoll/react-design'

export const CustomInput = styled(Input)`
  background-color: var(--qf-condition-item-bg);
  border: 1px solid var(-qf-condition-item-border);
`
export const StyledSelect = styled(Select)`
  display: flex;
  align-items: center;
  &:hover .ant-select-arrow {
    opacity: 0;
  }
  .ant-select-clear {
    border-radius: 50%;
    font-size: var(--qf-typography-fs-body);
  }
  .ant-select-selector {
    cursor: pointer !important;
    background-color: var(--qf-condition-item-bg) !important;
    border-color: var(--qf-condition-item-border) !important;
  }
`
