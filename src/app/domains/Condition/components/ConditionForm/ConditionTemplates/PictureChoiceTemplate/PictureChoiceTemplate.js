import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'

const { Option, OptGroup } = Select

function PictureChoiceTemplate(props) {
  const { answers, questionList, addRedirectQuestion } = props
  let startLetter = 65
  const onChange = (question, index) => {
    addRedirectQuestion(question, index)
  }
  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              p={2}
              mr={2}
              border="1px solid #bbbbbb"
              borderRadius="4px">
              <Button type="outline" style={{ marginRight: '10px' }}>
                <Text strong>{String.fromCharCode(startLetter++)}</Text>
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
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  height: '48px'
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

export default PictureChoiceTemplate
