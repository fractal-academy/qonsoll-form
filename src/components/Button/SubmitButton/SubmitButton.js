import { Button, Col, Row, Typography } from 'antd'
import React, { useState } from 'react'

import COLLECTIONS from '../../../constants/collection'
import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'
import { useAnswersContext } from '../../../context/Answers'
import useFunctions from '../../../../src/hooks/useFunctions'
import { useKeyPress } from '@umijs/hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslations } from '@qonsoll/translation'

const { Text } = Typography

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
  const navigate = useNavigate()
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
        await navigate(-1)
      }
      //This part for future improvements - add answer for answer layout
      // Object.values(answers)?.map((questionWithAnswer, index) => {})

      //add function from b2g and provide updatedAnswers
      await onFinish?.(updatedAnswers)
    } else onClick?.()
  }

  return (
    <Row display="flex" v="center" noGutters>
      <Col cw="auto" mr="16px">
        <Button
          size="large"
          type="primary"
          onClick={onButtonClick}
          loading={submitLoading || loading}
          onMouseDown={(e) => e.preventDefault()}
          {...rest}
        >
          {children || (
            <div display="flex" alignItems="center">
              OK
              <Icon
                ml="16px"
                size={24}
                name="CheckmarkFilled"
                fill="var(--btn-primary-color)"
              />
            </div>
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
  children: PropTypes.node,
  finish: PropTypes.bool,
  question: PropTypes.object,
  currentSlide: PropTypes.number,
  submitLoading: PropTypes.bool,
  disablePressEnter: PropTypes.bool,
  preventFirebaseUsage: PropTypes.bool
}

export default SubmitButton
