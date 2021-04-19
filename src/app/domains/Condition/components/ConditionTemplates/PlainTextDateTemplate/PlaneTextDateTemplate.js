import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, DatePicker, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { DATE_CONDITION_RULES_VALUES } from 'app/constants/dateConditionRules'
import { QuestionSelect } from 'domains/Question/components'
import PropTypes from 'prop-types'
import { globalStyles } from 'app/styles'
import { styles } from 'domains/Condition/components/ConditionTemplates/PlainShortTextStringTemplate/PlainShortTextStringTemplate.style'
const { Option } = Select

function PlaneTextDateTemplate(props) {
  const { answers, id, addCondition, questionList, addRedirectQuestion } = props
  // [CLEAN FUNCTIONS]
  const onClick = () => {
    addCondition({ name: '', redirectQuestion: null })
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
                defaultValue={DATE_CONDITION_RULES_VALUES[0]}
                style={styles.selectStyle}>
                {DATE_CONDITION_RULES_VALUES.map((item, index) => (
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
              key={index}
              style={{}}
              p={2}
              mr={2}
              border="1px solid #bbbbbb"
              borderRadius="4px">
              <DatePicker style={globalStyles.fullWidth} bordered={false} />
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
      <Button size="large" style={styles.bgc} onClick={onClick}>
        <Text strong style={styles.fontColor}>
          + Add condition
        </Text>
      </Button>
    </>
  )
}
PlaneTextDateTemplate.propTypes = {
  answers: PropTypes.array,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PlaneTextDateTemplate
