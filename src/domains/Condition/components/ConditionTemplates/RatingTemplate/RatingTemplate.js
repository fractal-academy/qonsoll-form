import React from 'react'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../../domains/Question/components'
import {
  CustomRatingBox,
  CustomTextBox
} from '../../../../../domains/Condition/components/ConditionTemplates/RatingTemplate/RatingTemplate.styles'

let startLetter = 65

function RatingTemplate(props) {
  const { questionOptions, questionList, addRedirectQuestion } = props

  return (
    <>
      {questionOptions?.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col cw={6}>
            <CustomRatingBox mr={4} pl={2}>
              <CustomTextBox mr={2} px={2}>
                <Text strong>{String.fromCharCode(startLetter + index)}</Text>
              </CustomTextBox>
              {item.answerOption}
            </CustomRatingBox>
          </Col>
          <Col cw={6}>
            <QuestionSelect
              addRedirectQuestion={addRedirectQuestion}
              questionOptions={questionOptions}
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
  questionOptions: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default RatingTemplate
