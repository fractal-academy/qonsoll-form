import styled from 'styled-components'
import { Box, Text, Button } from '@qonsoll/react-design'

export const CustomText = styled(Text)`
  color: var(--qf-typography-caption-color);
`

export const CustomButton = styled(Button)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const MediaListContainer = styled(Box)`
  height: 450px;
  overflow: auto;
  display: flex;
  flex-direction: row;
  background: var(--ql-body-bg);
`
