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
  const { questionConfigurations, questionList, addRedirectQuestion } = props

  return (
    <>
      {questionConfigurations?.map((item, index) => (
        <Row mb={2} key={index}>
          <Col cw={6} pl={0} pr={2}>
            <CustomRatingBox px={3} py="10px">
              <CustomTextBox mr={2} px={2}>
                <Text strong>{String.fromCharCode(startLetter + index)}</Text>
              </CustomTextBox>
              {item.answerOption}
            </CustomRatingBox>
          </Col>
          <Col cw={6}>
            <QuestionSelect
              addRedirectQuestion={addRedirectQuestion}
              questionConfigurations={questionConfigurations}
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
