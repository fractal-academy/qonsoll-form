import { Box, Row } from '@qonsoll/react-design'
import { Button, DatePicker, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import {
  TEXT_CONDITION_RULES,
  TEXT_CONDITION_RULES_VALUE
} from 'app/constants/planeTextStringConditionRules'
import { DATE_CONDITION_RULES_VALUE } from 'app/constants/dateConditionRules'

const { Option, OptGroup } = Select

const mockQuestionListRedirect = [
  'Go to next question',
  'question1',
  'question2',
  'question3'
]

function PlaneTextDateTemplate(props) {
  const { answers, onChange } = props
  // [CLEAN FUNCTIONS]
  const onClick = () => {}
  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters style={{ height: '50px' }} mb={2}>
          <Box
            display="flex"
            alignItems="center"
            border="1px solid #bbbbbb"
            borderRadius="4px"
            mr={2}>
            <Select
              showSearch
              allowClear
              bordered={false}
              onChange={onChange}
              defaultValue={DATE_CONDITION_RULES_VALUE[0]}
              style={{ width: '200px' }}>
              {DATE_CONDITION_RULES_VALUE.map((item, index) => (
                <Option key={index} value={item} onClick={() => {}}>
                  {item}
                </Option>
              ))}
            </Select>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            // width="300px"
            key={index}
            style={{}}
            p={2}
            mr={2}
            border="1px solid #ededed"
            borderRadius="4px">
            <DatePicker style={{ width: '300px' }} bordered={false} />
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
      <Box onClick={onClick}>Add condition </Box>
    </>
  )
}

export default PlaneTextDateTemplate
