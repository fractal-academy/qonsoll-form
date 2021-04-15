import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React, { useState } from 'react'
import { TEXT_CONDITION_RULES_VALUE } from 'app/constants/planeTextStringConditionRules'
import { QuestionSelect } from 'domains/Question/components'
import PropTypes from 'prop-types'
import PictureChoiceTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/PictureChoiceTemplate'

const { Option, OptGroup } = Select

function PlaneShortTextStringTemplate(props) {
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
              mr={2}>
              <Select
                showSearch
                allowClear
                bordered={false}
                defaultValue={TEXT_CONDITION_RULES_VALUE[0]}
                style={{
                  width: '100%',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
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
              key={index}
              style={{}}
              p={2}
              mr={2}
              height="50px"
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
PlaneShortTextStringTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PlaneShortTextStringTemplate
