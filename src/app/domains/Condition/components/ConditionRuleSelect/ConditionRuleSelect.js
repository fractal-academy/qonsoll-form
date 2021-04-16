import { Popover } from 'components'
import { Button, Menu, Select } from 'antd'
import { Col, Row } from '@qonsoll/react-design'
import React from 'react'
import { TEXT_CONDITION_RULES_VALUE } from 'app/constants/planeTextStringConditionRules'
import { DATE_CONDITION_RULES_VALUE } from 'app/constants/dateConditionRules'

const Option = Select

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
  )
}

export default ConditionRuleSelect
