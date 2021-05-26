import React from 'react'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import Text from 'antd/lib/typography/Text'
import { Button, Input, Select } from 'antd'
import { Box, Col, Row } from '@qonsoll/react-design'
import { styles } from './PlainLongTextStringTemplate.style'
import { QuestionSelect } from 'domains/Question/components'
import { TEXT_CONDITION_RULES_VALUES } from 'app/constants/planeTextStringConditionRules'

const { Option } = Select

function PlaneLongTextStringTemplate(props) {
  const { answers, addCondition, questionList, addRedirectQuestion } = props

  // [CLEAN FUNCTIONS]
  const onClick = () => {
    addCondition({ name: '', redirectQuestion: null })
  }

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col cw={6}>
            <Row noGutters>
              <Col cw="6">
                <Box display="flex" alignItems="center" mr={2}>
                  <Select
                    showSearch
                    allowClear
                    defaultValue={TEXT_CONDITION_RULES_VALUES[0]}
                    style={styles.selectStyle}>
                    {TEXT_CONDITION_RULES_VALUES.map((item, index) => (
                      <Option key={index} value={item} onClick={() => {}}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Box>
              </Col>
              <Col cw="6">
                <Box display="flex" alignItems="center" key={index} mr={4}>
                  <Input
                    style={{
                      backgroundColor: theme.color.dark.t.lighten9,
                      border: '1px solid',
                      borderColor: theme.color.dark.t.lighten5
                    }}
                  />
                </Box>
              </Col>
            </Row>
          </Col>

          <Col cw={6}>
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
        <Button size="medium" style={styles.bgc} onClick={onClick}>
          <Text strong style={styles.fontColor}>
            + Add condition
          </Text>
        </Button>
      </Row>
    </>
  )
}
PlaneLongTextStringTemplate.propTypes = {
  answers: PropTypes.array,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PlaneLongTextStringTemplate
