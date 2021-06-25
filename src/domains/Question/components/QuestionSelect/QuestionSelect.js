import React from 'react'
import { Select, Tag } from 'antd'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { StyledSelect } from './QuestionSelect.styles'
import styled from 'styled-components'

const { Option, OptGroup } = Select

const StyledTag = styled(Tag)`
  background-color: ${({ theme }) => theme.color.primary.t.lighten5};
  color: ${({ theme }) => theme.color.primary.default};
  border-color: ${({ theme }) => theme.color.primary.t.lighten2};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-right: 10px !important;
  font-size: 15px;
`

function QuestionSelect(props) {
  const { questionList, questionConfigurations, index, addRedirectQuestion } =
    props

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
      <Option value="Submit form">
        <Text strong>Submit form</Text>
      </Option>

      <OptGroup label="JUMP TO...">
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
