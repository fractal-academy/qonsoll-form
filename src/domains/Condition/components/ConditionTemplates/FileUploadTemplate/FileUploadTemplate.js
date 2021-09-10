import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Text } from '@qonsoll/react-design'
import { CustomUploaderBox } from './FileUploadTemplate.style'
import { QuestionSelect } from '../../../../../domains/Question/components'

function FileUploadTemplate(props) {
  const {
    isUploaded,
    questionList,
    addRedirectQuestion,
    questionConfigurations
  } = props

  return (
    <Row mb={2}>
      <Col cw={6} pl={0} pr={2}>
        <CustomUploaderBox px={3}>
          {isUploaded ? <Text>is uploaded</Text> : <Text>not uploaded</Text>}
        </CustomUploaderBox>
      </Col>
      <Col cw={6}>
        <QuestionSelect
          addRedirectQuestion={addRedirectQuestion}
          questionConfigurations={questionConfigurations}
          questionList={questionList}
        />
      </Col>
    </Row>
  )
}
FileUploadTemplate.propTypes = {
  isUploaded: PropTypes.bool.isRequired,
  questionList: PropTypes.array.isRequired,
  questionOptions: PropTypes.array.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired
}
export default FileUploadTemplate
