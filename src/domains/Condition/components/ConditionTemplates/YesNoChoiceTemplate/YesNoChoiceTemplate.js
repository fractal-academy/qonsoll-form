import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Text } from '@qonsoll/react-design'
import { CustomTextBox, CustomYesNoBox } from './YesNoChoiceTemplate.styles'
import { QuestionSelect } from '../../../../../domains/Question/components'

function YesNoChoiceTemplate(props) {
  const { questionConfigurations, questionList, addRedirectQuestion } = props

  return (
    <>
      {questionConfigurations?.map((item, index) => (
        <Row mb={2} key={index}>
          <Col cw={6} pl={0} pr={2}>
            <CustomYesNoBox px={3}>
              <CustomTextBox mr={2} px={2}>
                <Text color="var(--qf-font-color-caption1)" strong>
                  {item.answerOption[0].toUpperCase()}
                </Text>
              </CustomTextBox>
              {item?.answerOption}
            </CustomYesNoBox>
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

YesNoChoiceTemplate.propTypes = {
  questionList: PropTypes.array.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  questionConfigurations: PropTypes.array.isRequired
}

export default YesNoChoiceTemplate
