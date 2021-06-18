import React from 'react'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { Col, Row } from '@qonsoll/react-design'
import { CustomOpinionBox, CustomTextBox } from './OpinionScaleTemplate.styles'
import { QuestionSelect } from '../../../../../domains/Question/components'

let startLetter = 65

function OpinionScaleTemplate(props) {
  const { questionConfigurations, questionList, addRedirectQuestion } = props

  return (
    <>
      {questionConfigurations?.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col cw={6}>
            <CustomOpinionBox mr={4} pl={2}>
              <CustomTextBox mr={2} px={2}>
                <Text strong>{String.fromCharCode(startLetter + index)}</Text>
              </CustomTextBox>
              {item?.answerOption}
            </CustomOpinionBox>
          </Col>
          <Col cw={6}>
            <QuestionSelect
              addRedirectQuestion={addRedirectQuestion}
              // questionOptions={questionOptions}
              index={index}
              questionList={questionList}
            />
          </Col>
        </Row>
      ))}
    </>
  )
}

OpinionScaleTemplate.propTypes = {
  questionOptions: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default OpinionScaleTemplate
