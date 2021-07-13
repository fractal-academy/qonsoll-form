import { Menu } from 'antd'
import styled from 'styled-components'
import Text from 'antd/lib/typography/Text'
import typeformTheme from '../../../../../styles/theme'

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
  line-height: ${({ theme }) =>
    theme?.typography?.lineHeight?.caption1 ||
    typeformTheme?.typography?.lineHeight?.caption1} !important;

  &:hover {
    border-radius: 8px;
    background-color: ${({ theme }) =>
      theme?.color?.dark?.t?.lighten8 ||
      typeformTheme?.color?.dark?.t?.lighten8};
  }
`
export const Description = styled(Text)`
  font-size: ${({ theme }) =>
    theme?.typography?.fontSize?.caption1 ||
    typeformTheme?.typography?.fontSize?.caption1};
`
