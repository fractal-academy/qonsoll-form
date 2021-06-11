import React from 'react'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../../domains/Question/components'
import { CustomUploaderBox } from './FileUploadTemplate.style'

function FileUploadTemplate(props) {
  const { answers, isUploaded, questionList, addRedirectQuestion } = props

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col cw={6}>
            <CustomUploaderBox pl={2} mr={4}>
              {isUploaded ? (
                <Text>is uploaded</Text>
              ) : (
                <Text>not uploaded</Text>
              )}
            </CustomUploaderBox>
          </Col>
          <Col cw={6}>
            <QuestionSelect
              addRedirectQuestion={addRedirectQuestion}
              answers={answers}
              index={index}
              questionList={questionList}
            />
          </Col>
        </Row>
      ))}
    </>
  )
}
FileUploadTemplate.propTypes = {
  answers: PropTypes.array,
  isUploaded: PropTypes.bool.isRequired,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default FileUploadTemplate
