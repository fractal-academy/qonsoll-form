import { Popover, Button, Popconfirm } from 'antd'
import React, { useState } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import { QuestionConfigurationPopoverContent } from '../../../../domains/Question/components'

function QuestionConfigurationPopover(props) {
  const {
    data,
    questionsList,
    onQuestionTypeChange,
    customQuestionTypes,
    welcomeScreenShowRule
  } = props

  // [COMPONENT STATE HOOKS]
  const [showPopover, setShowPopover] = useState(false)

  // [CLEAN FUNCTIONS]
  const popoverShowChange = () => {
    setShowPopover(!showPopover)
  }

  const hasConditions = data?.questionConfigurations?.filter(
    (item, index) => item?.redirectQuestion.length > 0
  ).length

  const hasCondtitionOnIt =
    questionsList?.filter(
      (question) =>
        question?.questionConfigurations?.filter(
          (config) => config?.redirectQuestion === data?.id
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
      okText={'Continue'}>
      <Popover
        visible={showPopover}
        trigger="click"
        placement="bottomRight"
        content={
          <QuestionConfigurationPopoverContent
            data={data}
            setShowPopover={setShowPopover}
            welcomeScreenShowRule={welcomeScreenShowRule}
            customQuestionTypes={customQuestionTypes}
            onQuestionTypeChange={onQuestionTypeChange}
          />
        }>
        <Button type="primary" icon={<SettingOutlined />} />
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
          data={data}
          setShowPopover={setShowPopover}
          welcomeScreenShowRule={welcomeScreenShowRule}
          customQuestionTypes={customQuestionTypes}
          onQuestionTypeChange={onQuestionTypeChange}
        />
      }>
      <Button
        type="primary"
        icon={<SettingOutlined />}
        onClick={popoverShowChange}
      />
    </Popover>
    // This piece of code to do refactoring in future improvements to make it shorter
  )
}

QuestionConfigurationPopover.propTypes = {}

export default QuestionConfigurationPopover
