import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { QuestionSelect } from 'domains/Question/components'
import PropTypes from 'prop-types'
import OpinionScaleTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/OpinionScaleTemplate'

const { Option, OptGroup } = Select
const mockQuestionListRedirect = [
  'Go to the next question',
  'Yes/no question example',
  'Picture choice question example',
  'Short text question example',
  'Date question example'
]

function RatingTemplate(props) {
  const { answers, questionList, addRedirectQuestion } = props

  let startLetter = 65

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              key={index}
              p={2}
              mr={2}
              border="1px solid #bbbbbb"
              borderRadius="4px">
              <Button type="outline" style={{ marginRight: '10px' }}>
                <Text strong>{String.fromCharCode(startLetter++)}</Text>
              </Button>
              {item.name}
            </Box>
          </Col>
          <Col>
            <QuestionSelect
              addRedirectQuestion={addRedirectQuestion}
              answers={answers}
              index={index}
              questionList={questionList}
            />
          </Col>
        </Row>
      ))}
    </>
  )
}
RatingTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default RatingTemplate
