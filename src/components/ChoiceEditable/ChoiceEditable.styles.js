import { Box, Col, TextArea } from '@qonsoll/react-design'

import styled from 'styled-components'

export const Wrapper = styled(Box)`
  padding: ${(props) => (props.withImage ? '12px' : '12px 24px')};

  color: var(--qf-button-color);
  background-color: var(--qf-button-bg);
  border-radius: var(--btn-border-radius-base);

  &:hover {
    background-color: var(--qf-button-bg-hover);
  }
`

export const Media = styled(Box)`
  height: 100px;
  width: 150px;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: var(--qf-border-radius-md);
`

export const LetterBox = styled(Col)`
  // position: absolute;
  // top: 50%;
  // left: 24px;
  // transform: translate(0px, -50%);
  width: 26px;
  height: 26px;
  text-align: center;
  color: var(--qf-keybox-color);
  background-color: var(--qf-keybox-bg);
  border: 1px solid var(--qf-keybox-color);
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
  border: none !important;
  background-color: transparent !important;
  color: var(--qf-typography-subtitle-color);

  .ant-input:focus,
  .ant-input-focused {
    border: none !important;
  }
`
export const CustomCol = styled(Col)`
  position: absolute;
  bottom: 8px;
`
export const ChoiceOptionCol = styled(Col)`
  padding-left: ${({ withImage }) => (withImage ? '0' : '18px !important')};
`
