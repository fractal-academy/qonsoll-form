import { Typography } from 'antd'
import './SubmitButton.styles.css'
import PropTypes from 'prop-types'
import { Button } from 'app/components'
import { Row, Col } from '@qonsoll/react-design'
import { CheckOutlined } from '@ant-design/icons'

const { Text } = Typography

function SubmitButton(props) {
  const { children, onClick } = props

  // [CLEAN FUNCTIONS]
  const onButtonClick = () => {
    onClick && onClick()
  }

  return (
    <Row display="flex" v="center">
      <Col cw="auto" mr={2}>
        <Button buttonType="primary" className="submit" onClick={onButtonClick}>
          {children ? (
            children
          ) : (
            <Row display="flex">
              <Col mr={2}>OK</Col>
              <Col>
                <CheckOutlined />
              </Col>
            </Row>
          )}
        </Button>
      </Col>
      <Col>
        <Text>
          Press <b>Enter ↵</b>
        </Text>
      </Col>
    </Row>
  )
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default SubmitButton
