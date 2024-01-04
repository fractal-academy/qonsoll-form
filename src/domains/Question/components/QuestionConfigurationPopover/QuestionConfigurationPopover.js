import { Button, Popconfirm, Popover, Tooltip } from 'antd'
import React, { useState } from 'react'

import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import { QuestionConfigurationPopoverContent } from '../../../../domains/Question/components'
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
      cancelText={t('Cancel')}
    >
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
        }
      >
        <Tooltip title={t('Configure question')}>
          <Button
            type="primary"
            onMouseDown={(e) => e.preventDefault()}
            icon={
              <Icon
                size={20}
                name="SettingsFilled"
                fill="var(--btn-primary-color)"
              />
            }
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
        <div my={-12} mx={-16} p="8px">
          <QuestionConfigurationPopoverContent
            questionData={questionData}
            setShowPopover={setShowPopover}
            customQuestionTypes={customQuestionTypes}
            onQuestionTypeChange={onQuestionTypeChange}
            welcomeScreenShowRule={welcomeScreenShowRule}
          />
        </div>
      }
    >
      <Tooltip title={t('Configure question')}>
        <Button
          type="primary"
          onClick={popoverShowChange}
          onMouseDown={(e) => e.preventDefault()}
          icon={
            <Icon
              size={20}
              name="SettingsFilled"
              fill="var(--btn-primary-color)"
            />
          }
        />
      </Tooltip>
    </Popover>
    // This piece of code to do refactoring in future improvements to make it shorter
  )
}

QuestionConfigurationPopover.propTypes = {
  questionData: PropTypes.object,
  questionsList: PropTypes.array,
  customQuestionTypes: PropTypes.array,
  onQuestionTypeChange: PropTypes.func,
  welcomeScreenShowRule: PropTypes.bool
}

export default QuestionConfigurationPopover
