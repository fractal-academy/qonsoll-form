import { Select, Tag } from 'antd'
import styled from 'styled-components'

export const StyledTag = styled(Tag)`
  color: var(--qf-font-color-primary);
  background-color: var(--qf-condition-item-bg);
  border-color: var(--qf-condition-item-border);
  border-radius: var(--qf-border-radius-md);
  font-size: var(--qf-font-size-body1);
  margin-right: 10px !important;
  margin-left: 10px !important;
`
export const StyledSelect = styled(Select)`
  .ant-select-clear {
    border-radius: var(--qf-border-radius-full);
    font-size: 14px;
  }
`
