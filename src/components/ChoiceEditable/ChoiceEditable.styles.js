import styled from 'styled-components'
import { Box, Col, Input } from '@qonsoll/react-design'

const { TextArea } = Input

export const MainBox = styled(Box)`
  ${({ withImage }) => `
  border-radius: var(--qf-border-radius-md);
  width: ${withImage ? 'auto' : '100%'};
  position: relative;
  background-color: var(--qf-button-bg);
  &:hover{
     background-color: var(--qf-button-bg-hover);
  }
`}
`

export const MediaBox = styled(Box)`
  height: 100px;
  width: 150px;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: var(--qf-border-radius-md);
`

export const LetterBox = styled(Box)`
  ${({ withImage }) => `
  position: absolute;
  top: ${withImage ? '12px' : '6px'};
  width: 26px;
  text-align: center;
  color: var(--qf-keybox-color);
  background-color: var(--qf-keybox-bg);
  border: 1px solid var(--qf-keybox-color);
`}
`
export const DeleteButton = styled(Box)`
  position: absolute;
  right: -6px;
  top: -6px;
  cursor: pointer;
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--qf-typography-fs-caption);
  background-color: var(--qf-keybox-bg-active);
  color: var(--qf-keybox-color-active);
  border-radius: var(--qf-border-radius-full);
`
export const ChoiceInput = styled(TextArea)`
  color: var(--qf-typography-subtitle-color);
`
export const CustomCol = styled(Col)`
  position: absolute;
  bottom: 8px;
`
export const ChoiceOptionCol = styled(Col)`
  padding-left: ${({ withImage }) => (withImage ? '0' : '18px')};
`
