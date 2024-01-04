import { Col, Input, Row } from 'antd'

import styled from 'styled-components'

const { TextArea } = Input

export const Wrapper = styled(Row)`
  padding: ${(props) => (props.withImage ? '12px' : '12px 24px')};
  color: var(--qf-button-color);
  background-color: var(--qf-button-bg);
  border-radius: var(--btn-border-radius-base);

  &:hover {
    background-color: var(--qf-button-bg-hover);
  }
`

export const Media = styled(Col)`
  width: 100%;
  height: 100px;
  position: relative;
  margin-bottom: 8px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: var(--btn-border-radius-base);
`

export const Letter = styled.div`
  width: 26px;
  height: 26px;
  text-align: center;
  color: var(--qf-keybox-color);
  background-color: var(--qf-keybox-bg);
  border: 1px solid var(--qf-keybox-color);
`
export const Remove = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  margin: 8px;
  cursor: pointer;
  height: 16px;
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--qf-keybox-color-active);
  font-size: var(--qf-typography-fs-caption);
  border-radius: var(--qf-border-radius-full);
  background-color: var(--qf-keybox-bg-active);
`
export const ChoiceInput = styled(TextArea)`
  border: none !important;
  background-color: transparent !important;
  color: var(--qf-typography-subtitle-color);
`
