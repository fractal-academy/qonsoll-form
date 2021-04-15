import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { TEXT_CONDITION_RULES_VALUE } from 'app/constants/planeTextStringConditionRules'
import { QuestionSelect } from 'domains/Question/components'
import PropTypes from 'prop-types'
import RatingTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/RatingTemplate'

const { Option, OptGroup } = Select

function PlaneLongTextStringTemplate(props) {
  const { answers, id, addCondition, questionList, addRedirectQuestion } = props
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
            <QuestionSelect
              addRedirectQuestion={addRedirectQuestion}
              answers={answers}
              index={index}
              questionList={questionList}
            />
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
PlaneLongTextStringTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PlaneLongTextStringTemplate
