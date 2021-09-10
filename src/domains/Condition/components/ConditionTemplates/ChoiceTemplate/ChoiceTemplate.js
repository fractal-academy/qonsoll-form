import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Text } from '@qonsoll/react-design'
import { CustomChoiceBox, CustomTextBox } from './ChoiceTemplate.styles'
import { QuestionSelect } from '../../../../Question/components'

let startLetter = 65

function ChoiceTemplate(props) {
  const { questionConfigurations, questionList, addRedirectQuestion } = props

  return (
    <>
      {questionConfigurations?.map((item, index) => (
        <Row mb={2} key={index}>
          <Col cw={6} pl={0} pr={2}>
            <CustomChoiceBox px={3}>
              <CustomTextBox mr={2} px={2}>
                <Text strong>{String.fromCharCode(startLetter + index)}</Text>
              </CustomTextBox>
              <Text ellipsis>{item?.answerOption}</Text>
            </CustomChoiceBox>
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
ChoiceTemplate.propTypes = {
  questionConfigurations: PropTypes.array.isRequired,
  questionList: PropTypes.array.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired
}
export default ChoiceTemplate
