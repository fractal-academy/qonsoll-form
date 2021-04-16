import { Box, Col, Row } from '@qonsoll/react-design'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { QuestionSelect } from 'domains/Question/components'
import PropTypes from 'prop-types'

function FileUploadTemplate(props) {
  const { answers, isUploaded, questionList, addRedirectQuestion } = props

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              key={index}
              p={2}
              mr={2}
              height="50px"
              border="1px solid #bbbbbb"
              borderRadius="4px">
              {isUploaded ? (
                <Text>is uploaded</Text>
              ) : (
                <Text>not uploaded</Text>
              )}
            </Box>
          </Col>
          <Col>
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
