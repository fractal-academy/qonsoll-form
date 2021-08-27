import React from 'react'
import { Select, Tag } from 'antd'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { StyledSelect, StyledCaptionText } from './QuestionSelect.styles'
import styled from 'styled-components'
import typeformTheme from '../../../../../styles/theme'

const { Option, OptGroup } = Select

const StyledTag = styled(Tag)`
  background-color: ${({ theme }) =>
    theme?.color?.primary?.t?.lighten5 ||
    typeformTheme?.color?.primary?.t?.lighten5};
  color: ${({ theme }) =>
    theme?.color?.primary?.default || typeformTheme?.color?.primary?.default};
  border-color: ${({ theme }) =>
    theme?.color?.primary?.t?.lighten2 ||
    typeformTheme?.color?.primary?.t?.lighten2};
  border-radius: ${({ theme }) =>
    theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  margin-right: 10px !important;
  font-size: 15px;
`

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
      {/*  <Text>Submit form</Text>*/}
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
