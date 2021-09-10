import { Select, Tag } from 'antd'
import styled from 'styled-components'
import { Text } from '@qonsoll/react-design'

export const StyledSelect = styled(Select)`
  width: 100%;
  display: flex;
  align-items: center;
  .ant-select-clear {
    border-radius: var(--qf-border-radius-full);
    font-size: var(--qf-font-size-body2);
  }
  &:hover .ant-select-arrow {
    opacity: 0;
  }
  .ant-select-selector {
    cursor: pointer !important;
    background-color: var(
      --qf-condition-item-bg: var(--ql-color-dark-t-lighten6) ;
    ) !important;
    border-color: var(--qf-condition-item-border) !important;
  }
  .ant-select-selection-search {
    display: flex;
    align-items: center;
  }
`

export const StyledCaptionText = styled(Text)`
  font-size: var(--qf-font-size-caption1);
  line-height: var(--ql-line-height-caption1);
  font-weight: var(--ql-font-weight-regular);
  letter-spacing: var(--ql-letter-spacing-none);
`

export const StyledTag = styled(Tag)`
  background-color: var(--qf-condition-item-bg);
  color: var(--qf-font-color-primary);
  border-color: var(--qf-condition-item-border);
  border-radius: var(--qf-border-radius-md);
  margin-right: 10px !important;
  font-size: var(--ql-font-size-h5);
`
