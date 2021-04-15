import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React, { useState } from 'react'

const { Option, OptGroup } = Select

function YesNoChoiceTemplate(props) {
  const { answers, questionList, addRedirectQuestion } = props

  const onChange = (question, index) => {
    addRedirectQuestion(question, index)
  }
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
            <Box display="flex" border="1px solid #bbbbbb" borderRadius="4px">
              <Select
                value={
                  answers[index].redirectQuestion || 'Go to the next question'
                }
                showSearch
                allowClear
                bordered={false}
                onChange={(name) => onChange(name, index)}
                defaultValue="Go to the next question"
                style={{
                  width: '100%',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <Button>
                  <Text strong>Submit form</Text>
                </Button>

                <OptGroup label="JUMP TO...">
                  {questionList.map((item, index) => (
                    <Option key={index} value={item.name} onClick={() => {}}>
                      {item.name}
                    </Option>
                  ))}
                </OptGroup>
              </Select>
            </Box>
          </Col>
        </Row>
      ))}
    </>
  )
}

export default YesNoChoiceTemplate
