import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../../components'
import Title from 'antd/lib/typography/Title'
import { Select, Tag } from 'antd'
import styled from 'styled-components'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'feedback-typeform-app/src/context/Translation'

const StyledTag = styled(Tag)`
  background-color: ${({ theme }) => theme.color.primary.t.lighten5};
  color: ${({ theme }) => theme.color.primary.default};
  border-color: ${({ theme }) => theme.color.primary.t.lighten2};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  margin-right: 10px !important;
`

function ConditionForm(props) {
  const { Option, OptGroup } = Select
  const { item, index, questionsData } = props
  let startLetter = 65

  function handleChange(order, title) {
    console.log(title, order)
  }
  console.log(questionsData)

  const { questionsForEndingSelectPlaceholder } = useTranslation()

  return (
    <NumberedCard number={index + 1} key={index}>
      <Box ml={3}>
        <Title level={5} strong>
          {item?.title}
        </Title>
        <Select
          allowClear
          clearIcon={<DeleteOutlined />}
          style={{ width: '100%' }}
          mode="multiple"
          placeholder={
            questionsForEndingSelectPlaceholder ||
            'Select questions to call current ending'
          }
          onChange={handleChange}
          optionLabelProp="label">
          {questionsData?.map((questionListItem, index) => (
            <OptGroup
              key={index}
              label={
                <>
                  <StyledTag>{questionListItem?.order}</StyledTag>
                  {questionListItem?.title || questionListItem?.order}
                </>
              }>
              {questionListItem?.questionConfigurations.map(
                (questionAnswerItem, ind) => (
                  <Option
                    key={questionAnswerItem?.answerOptionId}
                    value={
                      <>
                        <StyledTag>
                          {questionListItem?.order}.
                          {String.fromCharCode(startLetter + ind)}
                        </StyledTag>
                        {questionAnswerItem?.answerOption || '-'}
                      </>
                    }>
                    <StyledTag>
                      {String.fromCharCode(startLetter + ind)}
                    </StyledTag>
                    {questionAnswerItem?.answerOption || '-'}
                  </Option>
                )
              )}
            </OptGroup>
          ))}
        </Select>
      </Box>
    </NumberedCard>
  )
}
ConditionForm.propTypes = {
  mockQuestionIndex: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  addCondition: PropTypes.func.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  getQuestionListRedirect: PropTypes.func.isRequired
}
export default ConditionForm
