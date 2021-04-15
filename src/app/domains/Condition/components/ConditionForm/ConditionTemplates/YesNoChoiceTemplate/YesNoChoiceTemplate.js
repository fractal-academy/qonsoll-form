import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React, { useState } from 'react'
import { QuestionSelect } from 'domains/Question/components'

const { Option, OptGroup } = Select

function YesNoChoiceTemplate(props) {
  const { answers, questionList, addRedirectQuestion } = props

  // const onChange = (question, index) => {
  //   addRedirectQuestion(question, index)
  // }
  return (
    <>
      {answers.map((item, index) => (
        <Row mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              p={2}
              mr={2}
              border="1px solid #bbbbbb"
              borderRadius="4px">
              <Button type="outline" style={{ marginRight: '10px' }}>
                <Text strong>{item.name[0].toUpperCase()}</Text>
              </Button>
              {item.name}
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

export default YesNoChoiceTemplate
