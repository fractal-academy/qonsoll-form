import {
  StyledCaptionText,
  StyledSelect,
  StyledTag
} from './QuestionSelect.styles'

import PropTypes from 'prop-types'
import React from 'react'
import { Select } from 'antd'
import { useTranslations } from '@qonsoll/translation'

const { Option, OptGroup } = Select

function QuestionSelect(props) {
  const {
    index = 0,
    questionList,
    addRedirectQuestion,
    questionConfigurations
  } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

  // [CLEAN FUNCTIONS]
  const onChange = (question, index) => {
    const questionCondition = question || ''

    addRedirectQuestion(questionCondition, index)
  }

  return (
    <StyledSelect
      value={
        questionConfigurations?.[index]?.redirectQuestion ||
        t('Go to the next question')
      }
      showSearch
      allowClear
      onChange={(question) => onChange(question, index)}
      defaultValue={t('Go to the next question')}
    >
      <OptGroup label={<StyledCaptionText>JUMP TO...</StyledCaptionText>}>
        {questionList?.map((item) => (
          <Option key={item?.id} value={item?.id}>
            <StyledTag> {item?.order}</StyledTag>
            {item.title}
          </Option>
        ))}
      </OptGroup>
    </StyledSelect>
  )
}

QuestionSelect.propTypes = {
  index: PropTypes.number.isRequired,
  questionList: PropTypes.array.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  questionConfigurations: PropTypes.array.isRequired
}

export default QuestionSelect
