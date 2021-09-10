import styled from 'styled-components'
import { Box, Text, Button } from '@qonsoll/react-design'

export const CustomText = styled(Text)`
  color: var(--qf-font-color-secondary);
`

export const CustomButton = styled(Button)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--qf-button-bg);
  border-color: var(--qf-button-bg);
  :hover {
    background-color: var(--qf-button-hover);
    border-color: var(--qf-button-bg);
  }
`

export const MediaListContainer = styled(Box)`
  height: 450px;
  overflow: auto;
  display: flex;
  flex-direction: row;
  background: var(--ql-body-bg);
`
