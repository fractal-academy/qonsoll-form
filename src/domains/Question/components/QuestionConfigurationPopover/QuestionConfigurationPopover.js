import { Popover, Button, Popconfirm, Tooltip } from 'antd'
import React, { useState } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import { QuestionConfigurationPopoverContent } from '../../../../domains/Question/components'
import { useTranslation } from '../../../../context/Translation'

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
  const { questionConfigurationTooltip } = useTranslation()

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
      title={
        'Please note that this question has logic settings.\n' +
        'Changing the question type will delete all of them.'
      }
      style={{ width: '350px' }}
      onConfirm={popoverShowChange}
      onCancel={!popoverShowChange}
      okText={'Continue'}
      okType="danger">
      <Popover
        visible={showPopover}
        trigger="click"
        placement="bottomRight"
        content={
          <QuestionConfigurationPopoverContent
            questionData={questionData}
            setShowPopover={setShowPopover}
            customQuestionTypes={customQuestionTypes}
            onQuestionTypeChange={onQuestionTypeChange}
            welcomeScreenShowRule={welcomeScreenShowRule}
          />
        }>
        <Tooltip title={questionConfigurationTooltip || 'Configure question'}>
          <Button
            type="primary"
            icon={<SettingOutlined />}
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
      content={
        <QuestionConfigurationPopoverContent
          questionData={questionData}
          setShowPopover={setShowPopover}
          customQuestionTypes={customQuestionTypes}
          onQuestionTypeChange={onQuestionTypeChange}
          welcomeScreenShowRule={welcomeScreenShowRule}
        />
      }>
      <Tooltip title={questionConfigurationTooltip || 'Configure question'}>
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
