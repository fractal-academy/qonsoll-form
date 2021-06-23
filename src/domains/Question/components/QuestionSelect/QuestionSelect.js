import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { StyledSelect } from './QuestionSelect.styles'

const { Option, OptGroup } = Select

function QuestionSelect(props) {
  const { questionList, questionConfigurations, index, addRedirectQuestion } =
    props

  // [CLEAN FUNCTIONS]
  const onChange = (question, index) => {
    addRedirectQuestion(question, index)
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
      <Option value="Submit form">
        <Text strong>Submit form</Text>
      </Option>
      <OptGroup label="JUMP TO...">
        {questionList.map((item, index) => (
          <Option key={item?.id} value={item?.id}>
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
