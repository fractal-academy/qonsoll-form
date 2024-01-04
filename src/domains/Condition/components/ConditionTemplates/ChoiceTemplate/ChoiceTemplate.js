import { Col, Row, Typography } from 'antd'

import LetterBox from '../../LetterBox'
import PropTypes from 'prop-types'
import QuestionPreview from '../../QuestionPreview'
import { QuestionSelect } from '../../../../Question/components'
import React from 'react'
import { useTranslations } from '@qonsoll/translation'

const { Text } = Typography

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
    <div>
      {questionConfigurations?.map((item, index) => (
        <Row mb="8px" key={index}>
          <Col cw={6} pr="8px" pl={0}>
            <QuestionPreview>
              {!handlesUpload && !handlesRecord && (
                <LetterBox px="8px" mr="8px">
                  <Text color="var(--qf-typography-subtitle-color)" strong>
                    {String.fromCharCode(startLetter + index)}
                  </Text>
                </LetterBox>
              )}
              <Text
                color="var(--qf-typography-title-color)"
                textOverflow="ellipsis"
                variant="body1"
              >
                {choiceAutoTextComputed || item?.answerOption}
              </Text>
            </QuestionPreview>
          </Col>
          <Col cw={6} pr={0} pl="8px">
            <QuestionSelect
              index={index}
              questionList={questionList}
              addRedirectQuestion={addRedirectQuestion}
              questionConfigurations={questionConfigurations}
            />
          </Col>
        </Row>
      ))}
    </div>
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
