import React from 'react'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { CustomTextBox, CustomYesNoBox } from './YesNoChoiceTemplate.styles'
import { Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from 'domains/Question/components'

function YesNoChoiceTemplate(props) {
  const { answers, questionList, addRedirectQuestion } = props

  return (
    <>
      {answers.map((item, index) => (
        <Row mb={2} key={index} noGutters>
          <Col cw={6}>
            <CustomYesNoBox mr={4} pl={2}>
              <CustomTextBox mr={2} px={2}>
                <Text strong>{item.name[0].toUpperCase()}</Text>
              </CustomTextBox>
              {item.name}
            </CustomYesNoBox>
          </Col>
          <Col cw={6}>
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

YesNoChoiceTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default YesNoChoiceTemplate
