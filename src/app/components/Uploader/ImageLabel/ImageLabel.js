import styled from 'styled-components'
import PropTypes from 'prop-types'

const ImageLabel = (props) => {
  const { children } = props

  const LabelWrapper = styled.label`
    width: 90px;
    height: 30px;
    font-size: 16px;
    border-radius: 7px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    //change on prime color in theme
    background-color: #1b44d8;
    //change on prime color in theme
    &:hover {
      background-color: #1b44d899;
    }
  `
  return <LabelWrapper>{children}</LabelWrapper>
}

export default ImageLabel

ImageLabel.propTypes = {
  children: PropTypes.node.isRequired
}
