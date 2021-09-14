import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

export const CustomOpinionBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: var(--qf-condition-item-bg);
  border: 1px solid var(--qf-condition-item-border);
  border-radius: var(--qf-border-radius-md);
`

export const CustomTextBox = styled(Box)`
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--qf-border-radius-sm);
  border: 1px solid var(--qf-condition-item-border);
`
