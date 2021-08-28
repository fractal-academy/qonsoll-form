import { Input } from 'antd'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import typeformTheme from '../../../styles/theme'

const { TextArea } = Input

const TextEditable = styled(TextArea).attrs(() => ({
  autoSize: { minRows: 1 /*, maxRows: 3 */ },
  maxLength: 700,
  bordered: false
}))`
  padding-left: 0;
  ${({ theme, isTitle }) =>
    isTitle &&
    css`
      font-size: ${theme?.typography?.fontSize?.h3 ||
      typeformTheme?.typography?.fontSize?.h3};
      font-weight: bold;
    `};
  ${({ theme, textSecondary }) =>
    textSecondary &&
    css`
      color: var(--text-color);
    `};
`

TextEditable.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  textSecondary: PropTypes.bool,
  isTitle: PropTypes.bool,
  placeholder: PropTypes.string.isRequired
}

export default TextEditable
