import React, { useState } from 'react'
import { Tooltip } from 'antd'
import { Popover, Button, Box } from '@qonsoll/react-design'
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
        // Box popoverContent was wrapped with Box with negative margin to cover antD default popover paddings
        <Box my={-12} mx={-16}>
          <QuestionTypeSelect
            questions={questions}
            onClick={onClick}
            customQuestionTypes={customQuestionTypes}
            welcomeScreenShowRule={welcomeScreenShowRule}
          />
        </Box>
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
