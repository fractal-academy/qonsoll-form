import { Button } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'app/styles/theme'

const Item = styled(Button)`
  background: ${theme.color.dark.t.lighten9};
  width: ${(props) => props.size[0]}px;
  height: ${(props) => props.size[1]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: ${theme.color.dark.t.lighten8};
    border-color: ${theme.color.dark.t.lighten8};
  }
`

function StyledItem(props) {
  const { children, onClick, size } = props

  return (
    <Item size={size} onClick={onClick}>
      {children}
    </Item>
  )
}

StyledItem.propTypes = {
  size: PropTypes.array,
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default StyledItem
