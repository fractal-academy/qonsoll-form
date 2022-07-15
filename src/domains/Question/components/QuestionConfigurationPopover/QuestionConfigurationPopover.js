import { Box, Button, Popover } from '@qonsoll/react-design'
import { Popconfirm, Tooltip } from 'antd'
import React, { useState } from 'react'

import {Icon} from '@qonsoll/icons'
import { QuestionConfigurationPopoverContent } from '../../../../domains/Question/components'
import { SettingOutlined } from '@ant-design/icons'
import { useTranslations } from '@qonsoll/translation'

function QuestionConfigurationPopover(props) {
  const {
    questionData,
    questionsList,
    customQuestionTypes,
    onQuestionTypeChange,
    welcomeScreenShowRule
  } = props

  // [COMPONENT STATE HOOKS]
  const [showPopover, setShowPopover] = useState(false)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [CLEAN FUNCTIONS]
  const popoverShowChange = () => {
    setShowPopover(!showPopover)
  }

  const hasConditions = questionData?.questionConfigurations?.filter(
    (item) => item?.redirectQuestion.length > 0
  ).length

  const hasCondtitionOnIt =
    questionsList?.filter(
      (question) =>
        question?.questionConfigurations?.filter(
          (config) => config?.redirectQuestion === questionData?.id
        )?.length > 0
    )?.length > 0

  // This piece of code to do refactoring in future improvements to make it shorter

  return (hasConditions || hasCondtitionOnIt) && showPopover !== true ? (
    <Popconfirm
      overlayInnerStyle={{
        width: '400px'
      }}
      title={t('Changing the question type will delete all connected logic')}
      style={{ width: '350px' }}
      onConfirm={popoverShowChange}
      onCancel={!popoverShowChange}
      okType="danger"
      okText={t('Continue')}
      cancelText={t('Cancel')}>
      <Popover
        visible={showPopover}
        trigger="click"
        placement="bottomRight"
        overlayStyle={{ width: '320px' }}
        content={
          <QuestionConfigurationPopoverContent
            questionData={questionData}
            setShowPopover={setShowPopover}
            customQuestionTypes={customQuestionTypes}
            onQuestionTypeChange={onQuestionTypeChange}
            welcomeScreenShowRule={welcomeScreenShowRule}
          />
        }>
        <Tooltip title={t('Configure question')}>
          <Button
            type="primary"
            icon={<Icon name='SettingsFilled' size={20} />}
            onMouseDown={(e) => e.preventDefault()}
          />
        </Tooltip>
      </Popover>
    </Popconfirm>
  ) : (
    <Popover
      visible={showPopover}
      onVisibleChange={popoverShowChange}
      trigger="click"
      placement="bottomRight"
      overlayStyle={{ width: '320px' }}
      content={
        // Box popoverContent was wrapped with Box with negative margin to cover antD default popover paddings
        <Box my={-12} mx={-16}>
          <QuestionConfigurationPopoverContent
            questionData={questionData}
            setShowPopover={setShowPopover}
            customQuestionTypes={customQuestionTypes}
            onQuestionTypeChange={onQuestionTypeChange}
            welcomeScreenShowRule={welcomeScreenShowRule}
          />
        </Box>
      }>
      <Tooltip title={t('Configure question')}>
        <Button
          type="primary"
          icon={<SettingOutlined />}
          onClick={popoverShowChange}
          onMouseDown={(e) => e.preventDefault()}
        />
      </Tooltip>
    </Popover>
    // This piece of code to do refactoring in future improvements to make it shorter
  )
}

QuestionConfigurationPopover.propTypes = {}

export default QuestionConfigurationPopover
