import { Col, Container, Row, Text } from '@qonsoll/react-design'

import LetterBox from '../../LetterBox'
import PropTypes from 'prop-types'
import QuestionPreview from '../../QuestionPreview'
import { QuestionSelect } from '../../../../Question/components'
import React from 'react'
import { useTranslations } from '@qonsoll/translation'

let startLetter = 65

function ChoiceTemplate(props) {
  const {
    questionList,
    handlesUpload,
    handlesRecord,
    addRedirectQuestion,
    questionConfigurations
  } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [COMPUTED PROPERTIES]
  const uploadChoiceText = t('is uploaded')
  const recordChoiceText = t('is recorded')
  const choiceAutoTextComputed =
    (handlesUpload && uploadChoiceText) || (handlesRecord && recordChoiceText)

  return (
    <Container>
      {questionConfigurations?.map((item, index) => (
        <Row mb={2} key={index}>
          <Col cw={6} pr={2} pl={0}>
            <QuestionPreview px={3}>
              {!handlesUpload && !handlesRecord && (
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
                {choiceAutoTextComputed || item?.answerOption}
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
  handlesRecord: PropTypes.bool,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func,
  questionConfigurations: PropTypes.array
}

export default ChoiceTemplate
