import { Box, Row } from '@qonsoll/react-design'
import { Button, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'

const { Option, OptGroup } = Select

const mockQuestionListRedirect = [
  'Go to next question',
  'question1',
  'question2',
  'question3'
]

function ChoiceTemplate(props) {
  const { answers } = props
  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters style={{ height: '50px' }} mb={2}>
          <Box
            display="flex"
            alignItems="center"
            width="300px"
            key={index}
            style={{}}
            p={2}
            mr={2}
            border="1px solid #ededed"
            borderRadius="4px">
            <Button type="outline" style={{ marginRight: '10px' }}>
              <Text strong>{item[0].toUpperCase()}</Text>
            </Button>
            {item}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            border="1px solid #bbbbbb"
            borderRadius="4px">
            <Select
              showSearch
              allowClear
              bordered={false}
              // onChange={onChange}
              defaultValue={mockQuestionListRedirect[0]}
              style={{ width: '300px' }}>
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
        </Row>
      ))}
    </>
  )
}

export default ChoiceTemplate
