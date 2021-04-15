import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { TEXT_CONDITION_RULES_VALUE } from 'app/constants/planeTextStringConditionRules'

const { Option, OptGroup } = Select

function PlaneLongTextStringTemplate(props) {
  const { answers, id, addCondition, questionList, addRedirectQuestion } = props
  // const [conditionArray, setConditionArray] = useState([''])
  // [CLEAN FUNCTIONS]
  const onClick = () => {
    addCondition('')
  }
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
              border="1px solid #bbbbbb"
              borderRadius="4px"
              height="48px"
              mr={2}>
              <Select
                showSearch
                allowClear
                bordered={false}
                // onChange={onChange}
                defaultValue={TEXT_CONDITION_RULES_VALUE[0]}
                style={{ width: '100%' }}>
                {TEXT_CONDITION_RULES_VALUE.map((item, index) => (
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
              <Input style={{ width: '100%' }} bordered={false} />
            </Box>
          </Col>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              border="1px solid #bbbbbb"
              borderRadius="4px"
              height="48px">
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
                  {Object.values(
                    questionList.map((item, index) => (
                      <Option key={index} value={item.name} onClick={() => {}}>
                        {item.name}
                      </Option>
                    ))
                  )}
                </OptGroup>
              </Select>
            </Box>
          </Col>
        </Row>
      ))}
      <Row>
        <Button
          size="large"
          style={{ backgroundColor: '#d6e1f2' }}
          onClick={onClick}>
          <Text strong style={{ color: '#1d6fdc' }}>
            + Add condition
          </Text>
        </Button>
      </Row>
    </>
  )
}

export default PlaneLongTextStringTemplate
