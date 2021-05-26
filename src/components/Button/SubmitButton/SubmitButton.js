import React from 'react'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import styled from 'styled-components'
import { Button, Typography } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import { CheckOutlined } from '@ant-design/icons'

const { Text } = Typography

const StyledSubmit = styled(Button)`
  width: 93px;
  height: 56px;
  font-size: ${theme.typography.fontSize.h4};
`

function SubmitButton(props) {
  const { children, onClick } = props

  // [CLEAN FUNCTIONS]
  const onButtonClick = () => {
    onClick && onClick()
  }

  return (
    <Row display="flex" v="center" noGutters>
      <Col cw="auto" mr={3}>
        <StyledSubmit type="primary" onClick={onButtonClick}>
          {children ? (
            children
          ) : (
            <Row display="flex" noGutters>
              <Col cw="auto" mr={2}>
                OK
              </Col>
              <Col>
                <CheckOutlined />
              </Col>
            </Row>
          )}
        </StyledSubmit>
      </Col>
      <Col cw="auto">
        <Text>Press enter ↵</Text>
      </Col>
    </Row>
  )
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default SubmitButton