import { Menu } from 'antd'
import styled from 'styled-components'
import Text from 'antd/lib/typography/Text'

export const QuestionsTypeMenu = styled(Menu)`
  height: 300px;
  overflow: auto;
  padding-right: 4px;
`
export const QuestionMenuItem = styled(Menu.Item)`
  display: flex;
  padding: 8px 0 !important;
  margin-top: 4px !important;
  margin-bottom: 4px !important;
  line-height: var(--ql-line-height-caption1) !important;

  &:hover {
    border-radius: var(--qf-border-radius-md);
    background-color: var(--qf-button-bg);
  }
`
export const Description = styled(Text)`
  font-size: var(--qf-font-size-caption1);
  color: var(--qf-font-color-caption1);
`
