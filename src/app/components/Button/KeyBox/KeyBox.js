import { Button } from 'antd'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import styled from 'styled-components'
import { useHover } from '@umijs/hooks'
import { CheckOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'

const StyledKeybox = styled(Col)`
  padding: 2px 5px;
  border-width: 1px;
  text-align: center;
  border-style: solid;
  border-color: ${theme.color.primary.default};
  color: ${(props) => props.isActive && theme.color.white.default};
  margin-left: ${(props) => props.isHovering && '-20px'};
  background-color: ${(props) =>
    props.isActive ? theme.color.primary.default : theme.color.white.default};
  width: ${(props) =>
    props.isHovering ? '60px !important' : ' 28px !important'};
`
const ImageContainer = styled(Box)`
  width: 150px;
  height: 120px;
  background-size: cover;
  background-image: url(${(props) => props.image});
`
const StyledButton = styled(Button)`
  width: 160px;
  color: ${theme.color.primary.default};
  background-color: ${theme.color.primary.t.lighten5};
  height: ${(props) => (props.hasImages ? '170px' : '45px')};

  &:hover {
    background-color: ${theme.color.primary.t.lighten3};
  }
`
const StyledIcon = styled(CheckOutlined)`
  font-size: 18px;
`

function KeyBox(props) {
  const { onButtonClick, item, isActive, hasImages } = props
  const { letter } = item || {}

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()

  return (
    <Box ref={hoverRef} display={hasImages && 'inline-block'} mb={2} mr={3}>
      <StyledButton hasImages={hasImages} onClick={() => onButtonClick(letter)}>
        {hasImages && (
          <Row h="center" display="flex">
            <Col
              mb={1}
              cw="auto"
              display="flex"
              textAlign="center"
              style={{ justifyContent: 'center' }}>
              <ImageContainer image={item?.choice?.image} />
            </Col>
          </Row>
        )}
        <Row display="flex" v="center" noGutters>
          <StyledKeybox isHovering={isHovering} isActive={isActive} mr={2}>
            {isHovering ? `Key ${letter}` : letter}
          </StyledKeybox>
          <Col>
            <Box className="text" display="flex" justifyContent="space-between">
              {item?.choice?.name}
              {isActive && <StyledIcon />}
            </Box>
          </Col>
        </Row>
      </StyledButton>
    </Box>
  )
}

KeyBox.propTypes = {
  item: PropTypes.object,
  hasImages: PropTypes.bool,
  onButtonClick: PropTypes.func,
  startLetter: PropTypes.string
}

export default KeyBox
