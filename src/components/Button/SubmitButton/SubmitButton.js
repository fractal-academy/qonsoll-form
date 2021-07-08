import React from 'react'
import PropTypes from 'prop-types'
import typeformTheme from '../../../../styles/theme'
import styled from 'styled-components'
import { Button, Typography } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import { CheckOutlined } from '@ant-design/icons'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'
import { useAnswersContext } from '../../../context/Answers'
import { useTranslation } from '../../../context/Translation'
import { useKeyPress } from '@umijs/hooks'
import useMedia from 'use-media'

const { Text } = Typography

const StyledSubmit = styled(Button)`
  height: 56px;
  font-size: ${({ theme }) =>
    theme?.typography?.fontSize?.h4 || typeformTheme?.typography?.fontSize?.h4};
`

function SubmitButton(props) {
  const {
    children,
    onClick,
    finish,
    question,
    currentSlide,
    disablePressEnter,
    ...rest
  } = props
  const formId = question?.formId

  // [ADDITIONAL_HOOKS]
  const answers = useAnswersContext()
  const { onFinish } = useActionsFunctionsContext()
  const { pressEnter } = useTranslation()
  const IsntDesktop = useMedia({ minWidth: '1024px' })

  useKeyPress(
    (e) =>
      //if pressed enter this event on this question slide - dispatch second callback
      !disablePressEnter &&
      e.keyCode === 13 &&
      currentSlide === question?.order,
    (e) => {
      if (e.type === 'keyup') {
        onButtonClick()
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [CLEAN FUNCTIONS]
  const onButtonClick = () => {
    if (finish) {
      const updatedAnswers = { formId, answers }
      // console.log(updatedAnswers)
      console.log(Object.values(answers))
      //This part for future improvements - add answer for answer layout
      // Object.values(answers)?.map((questionWithAnswer, index) => {})

      //add function from b2g and provide updatedAnswers
      onFinish?.(updatedAnswers)
    } else onClick?.()
  }
  return (
    <Row display="flex" v="center" noGutters>
      <Col cw="auto" mr={3}>
        <StyledSubmit
          type="primary"
          onClick={onButtonClick}
          onMouseDown={(e) => e.preventDefault()}
          {...rest}>
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
        <Text>{IsntDesktop && (pressEnter || 'Press enter') + ' ↵'} </Text>
      </Col>
    </Row>
  )
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default SubmitButton
