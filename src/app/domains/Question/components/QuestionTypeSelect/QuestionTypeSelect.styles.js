import { Menu } from 'antd'
import Text from 'antd/lib/typography/Text'
import typeformTheme from 'app/styles/theme'
import styled from 'styled-components'

export const QuestionsTypeMenu = styled(Menu)`
  height: 300px;
  overflow: auto;
  padding: 8px 0;
`
export const QuestionMenuItem = styled(Menu.Item)`
  line-height: ${({ theme }) =>
    theme?.typography?.lineHeight?.caption1} !important;
  padding: 0 !important;
`
export const Description = styled(Text)`
  font-size: ${({ theme }) =>
    theme?.typography?.fontSize?.caption1 ||
    typeformTheme?.typography?.fontSize?.caption1};
`
