import React from 'react'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../../domains/Question/components'
import { CustomUploaderBox } from './FileUploadTemplate.style'

function FileUploadTemplate(props) {
  const {
    questionConfigurations,
    isUploaded,
    questionList,
    addRedirectQuestion
  } = props

  return (
    <Row mb={2}>
      <Col cw={6} pl={0} pr={2}>
        <CustomUploaderBox px={3} py="11px">
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
  questionOptions: PropTypes.array,
  isUploaded: PropTypes.bool.isRequired,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default FileUploadTemplate
