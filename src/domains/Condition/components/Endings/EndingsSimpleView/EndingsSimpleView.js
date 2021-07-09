import PropTypes from 'prop-types'
import React, { useState, useMemo } from 'react'
import { Box } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../../components'
import Title from 'antd/lib/typography/Title'
import { Select, Tag } from 'antd'
import styled from 'styled-components'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'feedback-typeform-app/src/context/Translation'
import { COLLECTIONS } from '../../../../../constants'
import useFunctions from '../../../../../hooks/useFunctions'
import Text from 'antd/es/typography/Text'

const StyledTag = styled(Tag)`
  background-color: ${({ theme }) => theme.color.primary.t.lighten5};
  color: ${({ theme }) => theme.color.primary.default};
  border-color: ${({ theme }) => theme.color.primary.t.lighten2};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  margin-right: 10px !important;
`
const StyledSelect = styled(Select)`
  .ant-select-clear {
    border-radius: 50%;
    font-size: 14px;
  }
`

const { Option, OptGroup } = Select
let startLetter = 65

function EndingSimpleView(props) {
  const { item, index, questionsData } = props

  //[COMPONENT STATE HOOKS]

  // [ADDITIONAL HOOKS]
  const { setData } = useFunctions()

  async function handleChange(_, selectedItems) {
    const questionConfigurations = selectedItems?.map((item) => ({
      answerOptionId: item.key,
      trigerQuestionId: item?.value || ''
    }))
    await setData(COLLECTIONS.QUESTIONS, item?.id, {
      questionConfigurations
    })
  }

  const { questionsForEndingSelectPlaceholder } = useTranslation()

  const defaultSelectValue = useMemo(
    () =>
      item
        ? item?.questionConfigurations?.map(
            (config) => config?.trigerQuestionId
          )
        : [],
    [item]
  )

  return (
    <NumberedCard number={index + 1} key={index}>
      <Box ml={3}>
        <Title style={{ overflow: 'ellipsis' }} level={5}>
          {item?.title}
        </Title>
        <StyledSelect
          listHeight="300px"
          allowClear
          style={{ width: '100%' }}
          mode="multiple"
          placeholder={
            questionsForEndingSelectPlaceholder ||
            'Select questions to call current ending'
          }
          defaultValue={defaultSelectValue}
          onChange={handleChange}
          optionLabelProp="label">
          {questionsData?.map((questionListItem, index) => (
            <OptGroup
              key={index}
              label={
                <>
                  <StyledTag style={{ marginLeft: '-10px' }}>
                    {questionListItem?.order}
                  </StyledTag>
                  <Text type="secondary">
                    {questionListItem?.title || questionListItem?.order}
                  </Text>
                </>
              }>
              {questionListItem?.questionConfigurations?.map(
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
                    <StyledTag style={{ fontSize: '12px', marginLeft: '10px' }}>
                      {String.fromCharCode(startLetter + ind)}
                    </StyledTag>
                    {questionAnswerItem?.answerOption || '-'}
                  </Option>
                )
              )}
            </OptGroup>
          ))}
        </StyledSelect>
      </Box>
    </NumberedCard>
  )
}
EndingSimpleView.propTypes = {
  mockQuestionIndex: PropTypes.number,
  item: PropTypes.object.isRequired,
  addCondition: PropTypes.func.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  getQuestionListRedirect: PropTypes.func.isRequired
}
export default EndingSimpleView
