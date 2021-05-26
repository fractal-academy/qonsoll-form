import { Input } from 'antd'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import theme from 'app/styles/theme'

const { TextArea } = Input

const TextEditable = styled(TextArea).attrs(() => ({
  autoSize: { minRows: 1, maxRows: 3 },
  bordered: false
}))`
  padding-left: 0;
  ${(props) =>
    props.isTitle &&
    css`
      font-size: ${theme.typography.fontSize.h3};
      font-weight: bold;
    `};
  ${(props) =>
    props.textSecondary &&
    css`
      color: ${theme.color.dark.t.lighten2};
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
