import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../../components'
import Title from 'antd/lib/typography/Title'
import { Select, Tag } from 'antd'
import styled from 'styled-components'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'feedback-typeform-app/src/context/Translation'
import { COLLECTIONS } from '~/app/constants'
import useFunctions from '~/modules/feedback-typeform-app/src/hooks/useFunctions'

const StyledTag = styled(Tag)`
  background-color: ${({ theme }) => theme.color.primary.t.lighten5};
  color: ${({ theme }) => theme.color.primary.default};
  border-color: ${({ theme }) => theme.color.primary.t.lighten2};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  margin-right: 10px !important;
`

const { Option, OptGroup } = Select

function ConditionForm(props) {
  const { item, index, questionsData } = props
  let startLetter = 65

  // [ADDITIONAL HOOKS]
  const { setData } = useFunctions()

  async function handleChange(_, title) {
    const questionConfigurations = title.map((item) => ({
      answerOptionId: item.key,
      trigerQuestionId: item?.value?.split(' ')[0] || ''
    }))
    await setData(COLLECTIONS.QUESTIONS, item?.id, {
      questionConfigurations
    })
  }
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
                    value={`${questionListItem?.id} ${index}${ind}`}
                    label={
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
  mockQuestionIndex: PropTypes.number,
  item: PropTypes.object.isRequired,
  addCondition: PropTypes.func.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  getQuestionListRedirect: PropTypes.func.isRequired
}
export default ConditionForm
