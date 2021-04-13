import { Popover } from 'components'
import { Button, Menu, Select } from 'antd'
import { Col, Row } from '@qonsoll/react-design'
import React from 'react'
import { TEXT_CONDITION_RULES_VALUE } from 'app/constants/planeTextStringConditionRules'
import { DATE_CONDITION_RULES_VALUE } from 'app/constants/dateConditionRules'

const Option = Select
const textMenu = {
  isEqualTo: 'is equal to',
  isNotEqualTo: 'is not equal to',
  beginsWith: 'begins with',
  endsWith: 'ends with',
  contains: 'contains',
  doesNotContain: 'does not contain'
}
const dateMenu = {
  isOn: 'is on',
  isNotOn: 'is not on',
  isBefore: 'is before',
  isAfter: 'is after',
  isBeforeOrOn: 'is before or on',
  isAfterOrOn: 'is after or on'
}

const ConditionRuleSelect = (props) => {
  const { onChange, conditionType } = props
  let menu
  {
    // conditionType expect for conditionType="date"  if need to display conditionType date //
    conditionType == 'date'
      ? (menu = DATE_CONDITION_RULES_VALUE)
      : (menu = TEXT_CONDITION_RULES_VALUE)
  }

  return (
    <>
      <Row h="center" noGutters>
        <Col>
          <Select
            style={{ width: '200px' }}
            onChange={onChange}
            defaultValue={Object.values(menu)}>
            {Object.values(menu).map((item, index) => (
              <Option key={index} value={item} onClick={() => {}}>
                {item}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </>
  )
}

export default ConditionRuleSelect
