import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

export const CustomChoiceBox = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  background: var(--qf-condition-item-bg);
  border-radius: var(--qf-border-radius-md);
  border: 1px solid var(--qf-condition-item-border);
`

export const CustomTextBox = styled(Box)`
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--qf-border-radius-sm);
  border: 1px solid var(--qf-condition-item-border);
`
