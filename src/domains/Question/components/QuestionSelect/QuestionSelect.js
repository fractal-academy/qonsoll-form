import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import {
  StyledSelect,
  StyledCaptionText,
  StyledTag
} from './QuestionSelect.styles'

const { Option, OptGroup } = Select

function QuestionSelect(props) {
  const {
    questionList,
    questionConfigurations,
    index = 0,
    addRedirectQuestion
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
        'Go to the next question'
      }
      showSearch
      allowClear
      onChange={(question) => onChange(question, index)}
      defaultValue="Go to the next question">
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
  questionList: PropTypes.array.isRequired,
  questionOptions: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired
}

export default QuestionSelect
