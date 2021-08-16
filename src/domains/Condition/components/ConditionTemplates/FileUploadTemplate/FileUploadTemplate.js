import React from 'react'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../../domains/Question/components'
import { CustomUploaderBox } from './FileUploadTemplate.style'

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
