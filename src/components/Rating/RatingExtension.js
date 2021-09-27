import React from 'react'
import { v4 as uuid } from 'uuid'
import { Radio, Checkbox } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Container, Box, Button, Text } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'

function RatingExtension(props) {
  const { question, onClick, isFormQuiz, isMultiple } = props

  //[CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPUTED PROPERTIES]
  const ratingProps = currentQuestion.questionConfigurations || []

  // [CLEAN FUNCTIONS]
  const onRadioChange = (option) => {
    const score = ''

    const data = {
      question,
      answer: { value: option.target.value || '' },
      answerId: '1',
      answerScore: isFormQuiz ? score : ''
    }

    // if the data is sent we delay and animate the selected value, else - just go to next question
    if (!!option) {
      onClick && setTimeout(onClick, 700, data)
    } else {
      onClick?.(data)
    }
  }

  const onCheckboxChange = (option) => {}

  const addOption = () => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: [
        ...ratingProps,
        {
          answerOption: '',
          redirectQuestion: '',
          answerOptionId: uuid(),
          redirectConditionRule: ''
        }
      ]
    })
  }

  //testing data
  const checkOptions = ['I prefer not to answer', 'This is not relevant for me']

  return (
    <Container mt={4}>
      {isMultiple ? (
        <Checkbox.Group disabled={!onClick} onChange={onCheckboxChange}>
          {checkOptions.map((item) => (
            <Box mb={2}>
              <Checkbox value={item} disabled={!onClick}>
                <Text
                  color="var(--qf-typography-subtitle-color)"
                  variant="body1">
                  {item}
                </Text>
              </Checkbox>
            </Box>
          ))}
        </Checkbox.Group>
      ) : (
        <Radio.Group onChange={onRadioChange}>
          {checkOptions.map((item) => (
            <Box>
              <Radio value={item} disabled={!onClick}>
                <Text
                  color="var(--qf-typography-subtitle-color)"
                  variant="body1">
                  {item}
                </Text>
              </Radio>
            </Box>
          ))}
        </Radio.Group>
      )}

      <Box mt={2}>
        <Button type="dashed" onClick={addOption}>
          <PlusOutlined />
        </Button>
      </Box>
    </Container>
  )
}

export default RatingExtension
