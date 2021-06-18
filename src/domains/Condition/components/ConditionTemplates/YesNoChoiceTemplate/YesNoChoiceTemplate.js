import React from 'react'
import PropTypes from 'prop-types'
import theme from '../../../../../../styles/theme'
import Text from 'antd/lib/typography/Text'
import { CustomTextBox, CustomYesNoBox } from './YesNoChoiceTemplate.styles'
import { Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../../domains/Question/components'

function YesNoChoiceTemplate(props) {
  const { questionOptions, questionList, addRedirectQuestion } = props

  return (
    <>
      {questionOptions?.map((item, index) => (
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

YesNoChoiceTemplate.propTypes = {
  questionOptions: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default YesNoChoiceTemplate
