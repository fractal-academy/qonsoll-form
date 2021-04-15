import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { QuestionSelect } from 'domains/Question/components'
import PropTypes from 'prop-types'
import PlaneLongTextStringTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/PlainLongTextStringTemplate'

const { Option, OptGroup } = Select

function PictureChoiceTemplate(props) {
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
PictureChoiceTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PictureChoiceTemplate
