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

function FileUploadTemplate(props) {
  const { answers, onChange, isUploaded } = props

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              // width="300px"
              height="48px"
              key={index}
              p={2}
              mr={2}
              border="1px solid #bbbbbb"
              borderRadius="4px">
              {/*<Button type="outline" style={{ marginRight: '10px' }}></Button>*/}
              {isUploaded ? <Text>is uploaded</Text> : ' '}
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
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  height: '48px'
                }}>
                <Button>
                  <Text strong>Submit form</Text>
                </Button>
                <OptGroup label="JUMP TO...">
                  {Object.values(
                    mockQuestionListRedirect.map((item, index) => (
                      <Option key={index} value={item} onClick={() => {}}>
                        {item}
                      </Option>
                    ))
                  )}
                </OptGroup>
              </Select>
            </Box>
          </Col>
        </Row>
      ))}
    </>
  )
}

export default FileUploadTemplate
