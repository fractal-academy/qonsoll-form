import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

export const CustomYesNoBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: var(--qf-condition-item-bg);
  border: 1px solid var(--qf-condition-item-border);
  border-radius: var(--qf-border-radius-md);
`

export const CustomTextBox = styled(Box)`
  min-width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--qf-condition-item-border);
  border-radius: var(--qf-border-radius-md);
`
