import { DatePicker } from 'antd'
import styled from 'styled-components'

export const StyledDatePicker = styled(DatePicker)`
  background-color: var(--qf-input-background);

  .ant-picker-clear {
    border-radius: var(--qf-border-radius-full);
    font-size: var(--qf-typography-fs-body);
  }
`
