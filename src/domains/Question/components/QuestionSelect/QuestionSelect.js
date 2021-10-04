import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { TEXTINGS } from '../../../../constants'
import {
  StyledSelect,
  StyledCaptionText,
  StyledTag
} from './QuestionSelect.styles'

const { Option, OptGroup } = Select

function QuestionSelect(props) {
  const {
    index = 0,
    questionList,
    addRedirectQuestion,
    questionConfigurations
  } = props

  // [CLEAN FUNCTIONS]
  const onChange = (question, index) => {
    const questionCondition = question || ''

    addRedirectQuestion(questionCondition, index)
  }
  return (
    <StyledSelect
      value={
        questionConfigurations?.[index]?.redirectQuestion ||
        TEXTINGS.conditionNextQuestionRedirect
      }
      showSearch
      allowClear
      onChange={(question) => onChange(question, index)}
      defaultValue={TEXTINGS.conditionNextQuestionRedirect}>
      {/*FOR FUTURE IMPROVEMENTS  - if it will be necessary - add option "Submit form"*/}
      {/*<Option value="Submit form">*/}
      {/*  <Text color="var(--qf-typography-subtitle-color)" >Submit form</Text>*/}
      {/*</Option>*/}

      <OptGroup label={<StyledCaptionText>JUMP TO...</StyledCaptionText>}>
        {questionList?.map((item, index) => (
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
