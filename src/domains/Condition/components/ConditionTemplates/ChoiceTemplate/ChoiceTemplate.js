import React from 'react'
import PropTypes from 'prop-types'
import { QuestionSelect } from '../../../../Question/components'
import { Container, Row, Col, Text } from '@qonsoll/react-design'
import { useTranslation } from '../../../../../context/Translation'
import QuestionPreview from '../../QuestionPreview'
import { TEXTINGS } from '../../../../../constants'
import LetterBox from '../../LetterBox'

let startLetter = 65

function ChoiceTemplate(props) {
  const {
    questionList,
    handlesUpload,
    addRedirectQuestion,
    questionConfigurations
  } = props

  // [ADDITIONAL_HOOKS]
  const { conditionModalIsUploaded } = useTranslation()

  return (
    <Container>
      {questionConfigurations?.map((item, index) => (
        <Row mb={2} key={index}>
          <Col cw={6} pr={2} pl={0}>
            <QuestionPreview px={3}>
              {!handlesUpload && (
                <LetterBox px={2} mr={2}>
                  <Text color="var(--qf-typography-subtitle-color)" strong>
                    {String.fromCharCode(startLetter + index)}
                  </Text>
                </LetterBox>
              )}
              <Text
                color="var(--qf-typography-title-color)"
                textOverflow="ellipsis"
                variant="body1">
                {handlesUpload
                  ? conditionModalIsUploaded ||
                    TEXTINGS.conditionModalIsUploaded
                  : item?.answerOption}
              </Text>
            </QuestionPreview>
          </Col>
          <Col cw={6} pr={0} pl={2}>
            <QuestionSelect
              index={index}
              questionList={questionList}
              addRedirectQuestion={addRedirectQuestion}
              questionConfigurations={questionConfigurations}
            />
          </Col>
        </Row>
      ))}
    </Container>
  )
}

ChoiceTemplate.propTypes = {
  handlesUpload: PropTypes.bool,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func,
  questionConfigurations: PropTypes.array
}

export default ChoiceTemplate
