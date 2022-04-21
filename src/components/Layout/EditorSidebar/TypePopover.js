import { Box, Button, Popover } from '@qonsoll/react-design'

import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { QuestionTypeSelect } from '../../../domains/Question/components'
import React from 'react'
import { Tooltip } from 'antd'
import { useTranslations } from '@qonsoll/translation'

function TypePopover(props) {
  const {
    onClick,
    questions,
    showPopover,
    setShowPopover,
    popoverShowChange,
    customQuestionTypes,
    welcomeScreenShowRule
  } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

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
            onClick={onClick}
            questions={questions}
            customQuestionTypes={customQuestionTypes}
            welcomeScreenShowRule={welcomeScreenShowRule}
          />
        </Box>
      }>
      <Tooltip placement="bottom" title={t('Create new question')}>
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

TypePopover.propTypes = {
  onClick: PropTypes.func,
  questions: PropTypes.array,
  showPopover: PropTypes.bool,
  setShowPopover: PropTypes.func,
  popoverShowChange: PropTypes.func,
  customQuestionTypes: PropTypes.array,
  welcomeScreenShowRule: PropTypes.bool
}

export default TypePopover
