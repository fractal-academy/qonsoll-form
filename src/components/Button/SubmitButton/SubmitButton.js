import { Button, Col, Row, Text } from '@qonsoll/react-design'
import React, { useState } from 'react'

import COLLECTIONS from '../../../constants/collection'
import { CheckOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'
import { useAnswersContext } from '../../../context/Answers'
import useFunctions from '../../../../src/hooks/useFunctions'
import { useHistory } from 'react-router-dom'
import { useKeyPress } from '@umijs/hooks'
import { useTranslations } from '@qonsoll/translation'

function SubmitButton(props) {
  const {
    children,
    onClick,
    finish,
    question,
    currentSlide,
    submitLoading,
    disablePressEnter,
    preventFirebaseUsage,
    ...rest
  } = props

  const formId = question?.formId

  // [CUSTOM_HOOKS]
  const { getCollectionRef, setData, getTimestamp } = useFunctions()

  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const answers = useAnswersContext()
  const { onFinish } = useActionsFunctionsContext()
  const { t } = useTranslations()
  const isntDesktop = window.innerWidth >= 1024

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
      if (!preventFirebaseUsage) {
        setLoading(true)
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
        setLoading(false)
        await history.goBack()
      }
      //This part for future improvements - add answer for answer layout
      // Object.values(answers)?.map((questionWithAnswer, index) => {})

      //add function from b2g and provide updatedAnswers
      await onFinish?.(updatedAnswers)
    } else onClick?.()
  }

  return (
    <Row display="flex" v="center" mt={!isntDesktop && 3} noGutters>
      <Col cw="auto" mr={3}>
        <Button
          type="primary"
          height="56px"
          loading={submitLoading || loading}
          onClick={onButtonClick}
          onMouseDown={(e) => e.preventDefault()}
          fontSize="var(--qf-submit-button-font-size)"
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
        </Button>
      </Col>
      {isntDesktop && (
        <Col cw="auto">
          <Text color="var(--qf-typography-subtitle-color)">
            {t('Press enter') + ' ↵'}
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
