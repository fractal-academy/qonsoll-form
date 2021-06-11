import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Typography } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import { CheckOutlined } from '@ant-design/icons'
import { useAnswersContext } from 'app/context/Answers/useAnswersContext'
import typeformTheme from 'app/styles/theme'

const { Text } = Typography

const StyledSubmit = styled(Button)`
  height: 56px;
  font-size: ${({ theme }) =>
    theme?.typography?.fontSize?.h4 || typeformTheme?.typography?.fontSize?.h4};
`

function SubmitButton(props) {
  const { children, onClick, finish, question } = props
  const formId = question?.formId

  //[ADDITIONAL HOOKS]
  const answers = useAnswersContext()

  // [CLEAN FUNCTIONS]
  const onButtonClick = () => {
    if (finish) {
      const updatedAnswers = { formId, answers }
      //add function from b2g and provide updatedAnswers
      console.log(updatedAnswers)
    } else onClick && onClick()
  }

  return (
    <Row display="flex" v="center" noGutters>
      <Col cw="auto" mr={3}>
        <StyledSubmit type="primary" onClick={onButtonClick}>
          {children || (
            <Row display="flex" noGutters>
              <Col cw="auto" mr={2}>
                OK
              </Col>
              <Col v="center">
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
