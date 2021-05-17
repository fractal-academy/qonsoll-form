import { Input } from 'antd'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import theme from 'app/styles/theme'

const { TextArea } = Input

const TextEditable = styled(TextArea).attrs((props) => ({
  bordered: false,
  autoSize: true
}))`
  padding-left: 0;
  ${(props) =>
    props.isTitle
      ? css`
          font-size: ${theme.typography.fontSize.h4};
          font-weight: bold;
        `
      : css`
          font-size: ${theme.typography.fontSize.body1};
          font-weight: normal;
        `};
  color: ${(props) =>
    props.textSecondary
      ? `${theme.color.dark.t.lighten2}`
      : `${theme.color.dark.default}`};
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
