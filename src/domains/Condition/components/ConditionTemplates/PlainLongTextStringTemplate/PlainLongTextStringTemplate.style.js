import styled from 'styled-components'
import { Button, Text } from '@qonsoll/react-design'

export const CustomText = styled(Text)`
  color: var(--qf-typography-title-color);
`

export const CustomButton = styled(Button)`
  background-color: var(--qf-button-bg);
  &:hover {
    background-color: var(--qf-button-hover);
  }
`
