import React from 'react'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { Col, Row } from '@qonsoll/react-design'
import {
  CustomPictureChoiceBox,
  CustomTextBox
} from './PictureChoiceTemplate.styles'
import { QuestionSelect } from '../../../../../domains/Question/components'

let startLetter = 65

function PictureChoiceTemplate(props) {
  const { questionOptions, questionList, addRedirectQuestion } = props

  return (
    <>
      {questionOptions?.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col cw={6}>
            <CustomPictureChoiceBox pl={2} mr={4}>
              <CustomTextBox mr={2} px={2}>
                <Text strong>{String.fromCharCode(startLetter + index)}</Text>
              </CustomTextBox>
              {item.name}
            </CustomPictureChoiceBox>
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
PictureChoiceTemplate.propTypes = {
  questionOptions: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PictureChoiceTemplate
