import { Select } from 'antd'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { COLLECTIONS } from '../../../../../constants'
import { NumberedCard } from '../../../../../components'
import { Box, Text, Title } from '@qonsoll/react-design'
import useFunctions from '../../../../../hooks/useFunctions'
import { useTranslation } from '../../../../../context/Translation'
import { StyledTag, StyledSelect } from './EndingsSimpleView.styles'

const { Option, OptGroup } = Select

let startLetter = 65

function EndingSimpleView(props) {
  const { item, index, questionsData } = props

  // [ADDITIONAL HOOKS]
  const { setData } = useFunctions()
  const { questionsForEndingSelectPlaceholder } = useTranslation()

  // [CLEAN FUNCTIONS]
  async function handleChange(_, selectedItems) {
    const questionConfigurations = selectedItems?.map((item) => ({
      answerOptionId: item.key,
      triggerQuestionId: item?.value || ''
    }))
    await setData(COLLECTIONS.QUESTIONS, item?.id, {
      questionConfigurations
    })
  }
  const defaultSelectValue = useMemo(
    () =>
      item?.questionConfigurations?.[0]?.triggerQuestionId
        ? item?.questionConfigurations?.map(
            (config) => config?.triggerQuestionId
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
                  <Text fontSize="var(--qf-font-size-body1)" type="secondary">
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
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  questionsData: PropTypes.array.isRequired
}
export default EndingSimpleView
