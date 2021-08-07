import React, { useState } from 'react'
import { Popover, Tooltip, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from '../../../context/Translation'
import { QuestionTypeSelect } from '../../../domains/Question/components'

function TypePopover(props) {
  const { questions, onClick, customQuestionTypes, welcomeScreenShowRule } =
    props

  // [COMPONENT STATE HOOKS]
  const [showPopover, setShowPopover] = useState(false)

  // [ADDITIONAL HOOKS]
  const { createNewQuestionTooltip } = useTranslation()

  // [CLEAN FUNCTIONS]
  const popoverShowChange = () => {
    //move to editor sidebar
    setShowPopover(!showPopover)
  }

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      visible={showPopover}
      onVisibleChange={() => {
        setShowPopover(!showPopover)
      }}
      content={
        <QuestionTypeSelect
          questions={questions}
          onClick={onClick}
          customQuestionTypes={customQuestionTypes}
          welcomeScreenShowRule={welcomeScreenShowRule}
        />
      }>
      <Tooltip
        placement="bottom"
        title={createNewQuestionTooltip || 'Create new question'}>
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={popoverShowChange}
          onMouseDown={(e) => e.preventDefault()}
        />
      </Tooltip>
    </Popover>
  )
}

export default TypePopover
