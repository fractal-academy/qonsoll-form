import useMedia from 'use-media'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React, { useState } from 'react'
import { Button } from 'antd'
import { useKeyPress } from '@umijs/hooks'
import { Row, Col, Text } from '@qonsoll/react-design'
import { CheckOutlined } from '@ant-design/icons'
import COLLECTIONS from '../../../constants/collection'
import { useAnswersContext } from '../../../context/Answers'
import { useTranslation } from '../../../context/Translation'
import useFunctions from '../../../../src/hooks/useFunctions'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'

const StyledSubmit = styled(Button)`
  height: 56px;
  font-size: var(--qf-font-size-h4);
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

  // [CUSTOM_HOOKS]
  const { getCollectionRef, setData, getTimestamp } = useFunctions()

  // [ADDITIONAL_HOOKS]
  const answers = useAnswersContext()
  const { onFinish } = useActionsFunctionsContext()
  const { pressEnter } = useTranslation()
  const isntDesktop = useMedia({ minWidth: '1024px' })

  const mockUser = { name: 'John Doe' }

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

  const [loading, setLoading] = useState(false)

  // [CLEAN FUNCTIONS]
  const onButtonClick = async () => {
    if (finish) {
      const updatedAnswers = { formId, answers }
      const sendAnswersTimestamp = getTimestamp().fromDate(new Date())

      Object.values(answers).forEach((item) => {
        const answerId = getCollectionRef(COLLECTIONS?.ANSWERS).doc().id
        setData(COLLECTIONS?.ANSWERS, answerId, {
          id: answerId,
          formId: formId,
          questionId: item?.question?.id,
          answer: item?.answer?.value,
          answerScore: item?.answerScore || '',
          questionType: item?.question?.questionType,
          questionTitle: item?.question?.title,
          user: mockUser?.name,
          date: sendAnswersTimestamp,
          order: item?.question?.order
        })
      })
      const userAnswersGroupId = getCollectionRef(
        COLLECTIONS.USER_ANSWERS_GROUP
      ).doc().id
      setData(COLLECTIONS?.USER_ANSWERS_GROUP, userAnswersGroupId, {
        id: userAnswersGroupId,
        formId: formId,
        date: sendAnswersTimestamp,
        user: mockUser?.name
      })
      //This part for future improvements - add answer for answer layout
      // Object.values(answers)?.map((questionWithAnswer, index) => {})
      setLoading(true)

      //add function from b2g and provide updatedAnswers
      await onFinish?.(updatedAnswers)
      setLoading(false)
    } else onClick?.()
  }
  return (
    <Row display="flex" v="center" mt={!isntDesktop && 3} noGutters>
      <Col cw="auto" mr={3}>
        <StyledSubmit
          type="primary"
          onClick={onButtonClick}
          onMouseDown={(e) => e.preventDefault()}
          {...rest}
          loading={loading}>
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
      {isntDesktop && (
        <Col cw="auto">
          <Text color="var(--qf-font-color-caption1)">
            {(pressEnter || 'Press enter') + ' ↵'}{' '}
          </Text>
        </Col>
      )}
    </Row>
  )
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default SubmitButton
