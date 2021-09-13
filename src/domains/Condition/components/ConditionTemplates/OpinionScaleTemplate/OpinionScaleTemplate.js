import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Text } from '@qonsoll/react-design'
import { CustomOpinionBox, CustomTextBox } from './OpinionScaleTemplate.styles'
import { QuestionSelect } from '../../../../../domains/Question/components'

let startLetter = 65

function OpinionScaleTemplate(props) {
  const { questionConfigurations, questionList, addRedirectQuestion } = props

  return (
    <>
      {questionConfigurations?.map((item, index) => (
        <Row mb={2} key={index}>
          <Col cw={6} pl={0} pr={2}>
            <CustomOpinionBox px={3}>
              <CustomTextBox mr={2} px={2}>
                <Text color="var(--qf-font-color-caption1)" strong>
                  {String.fromCharCode(startLetter + index)}
                </Text>
              </CustomTextBox>
              {item?.answerOption}
            </CustomOpinionBox>
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

OpinionScaleTemplate.propTypes = {
  questionList: PropTypes.array.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  questionConfigurations: PropTypes.array.isRequired
}

export default OpinionScaleTemplate
