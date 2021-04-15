import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, DatePicker, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { DATE_CONDITION_RULES_VALUE } from 'app/constants/dateConditionRules'
import { QuestionSelect } from 'domains/Question/components'
import PropTypes from 'prop-types'
import PlaneShortTextStringTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/PlainShortTextStringTemplate'
const { Option } = Select

function PlaneTextDateTemplate(props) {
  const { answers, id, addCondition, questionList, addRedirectQuestion } = props
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
                defaultValue={DATE_CONDITION_RULES_VALUE[0]}
                style={{
                  width: '100%',
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
              <DatePicker style={{ width: '100%' }} bordered={false} />
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
PlaneTextDateTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PlaneTextDateTemplate
