import { Select, Tag, Typography } from 'antd'

import styled from 'styled-components'

const { Text } = Typography

export const StyledSelect = styled(Select)`
  width: 100%;
  display: flex;
  align-items: center;
  .ant-select-clear {
    border-radius: var(--qf-border-radius-full);
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
  color: var(--qf-typography-subtitle-color);
  font-size: var(--qf-typography-fs-caption);
  line-height: var(--ql-line-height-caption1);
  font-weight: var(--ql-font-weight-regular);
  letter-spacing: var(--ql-letter-spacing-none);
`

export const StyledTag = styled(Tag)`
  background-color: var(--qf-condition-item-bg);
  color: var(--qf-typography-title-color);
  border-color: var(--qf-condition-item-border);
  border-radius: var(--qf-border-radius-md);
  margin-right: 10px !important;
  font-size: var(--ql-font-size-h5);
`
