import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'

const { Option, OptGroup } = Select

const mockQuestionListRedirect = [
  'Go to the next question',
  'Yes/no question example',
  'Picture choice question example',
  'Short text question example',
  'Date question example'
]

function YesNoChoiceTemplate(props) {
  const { answers, onChange, questionList } = props
  return (
    <>
      {answers.map((item, index) => (
        <Row mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              // width="500px"
              key={index}
              p={2}
              mr={2}
              border="1px solid #bbbbbb"
              borderRadius="4px">
              <Button type="outline" style={{ marginRight: '10px' }}>
                <Text strong>{item[0].toUpperCase()}</Text>
              </Button>
              {item}
            </Box>
          </Col>
          <Col>
            <Box display="flex" border="1px solid #bbbbbb" borderRadius="4px">
              <Select
                showSearch
                allowClear
                bordered={false}
                onChange={onChange}
                defaultValue={mockQuestionListRedirect[0]}
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
