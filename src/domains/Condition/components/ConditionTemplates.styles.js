import styled from 'styled-components'
import { DatePicker } from 'antd'
import { Box, Button } from '@qonsoll/react-design'

export const QuestionPreview = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: var(--qf-condition-item-bg);
  border-radius: var(--qf-border-radius-md);
  border: 1px solid var(--qf-condition-item-border);
`

export const LetterBox = styled(Box)`
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--qf-border-radius-sm);
  border: 1px solid var(--qf-condition-item-border);
`

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
