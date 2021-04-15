import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, DatePicker, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import {
  TEXT_CONDITION_RULES,
  TEXT_CONDITION_RULES_VALUE
} from 'app/constants/planeTextStringConditionRules'
import { DATE_CONDITION_RULES_VALUE } from 'app/constants/dateConditionRules'
import { mockQuestion } from 'domains/Condition/components/ConditionForm/ConditionForm'
// import mockData
const { Option, OptGroup } = Select

const mockQuestionListRedirect = [
  'Go to the next question',
  'Yes/no question example',
  'Picture choice question example',
  'Short text question example',
  'Date question example'
]

function PlaneTextDateTemplate(props) {
  const { answers, id, addCondition, questionList } = props
  // const [conditionArray, setConditionArray] = useState([''])
  // [CLEAN FUNCTIONS]
  const onClick = () => {
    addCondition('')
  }
  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              border="1px solid #bbbbbb"
              borderRadius="4px"
              mr={2}>
              <Select
                showSearch
                allowClear
                bordered={false}
                // onChange={onChange}
                defaultValue={DATE_CONDITION_RULES_VALUE[0]}
                style={{
                  width: '300px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                {DATE_CONDITION_RULES_VALUE.map((item, index) => (
                  <Option key={index} value={item} onClick={() => {}}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Box>
          </Col>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              // width="300px"
              key={index}
              style={{}}
              p={2}
              mr={2}
              border="1px solid #bbbbbb"
              borderRadius="4px">
              <DatePicker style={{ width: '300px' }} bordered={false} />
            </Box>
          </Col>
          <Col>
            <Box
              display="flex"
              // alignItems="center"
              border="1px solid #bbbbbb"
              borderRadius="4px">
              <Select
                showSearch
                allowClear
                bordered={false}
                // onChange={onChange}
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
      <Button
        size="large"
        style={{ backgroundColor: '#d6e1f2' }}
        onClick={onClick}>
        <Text strong style={{ color: '#1d6fdc' }}>
          + Add condition
        </Text>
      </Button>
    </>
  )
}

export default PlaneTextDateTemplate
