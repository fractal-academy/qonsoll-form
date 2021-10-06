import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import LetterBox from '../../LetterBox'
import { Select as AntSelect } from 'antd'
import { NumberedCard } from '../../../../../components'
import useFunctions from '../../../../../hooks/useFunctions'
import { COLLECTIONS, TEXTINGS } from '../../../../../constants'
import { useTranslation } from '../../../../../context/Translation'
import { Title, Text, Select, Box, Divider } from '@qonsoll/react-design'

let startLetter = 65

function EndingSimpleView(props) {
  const { item, index, questionsData } = props

  // [ADDITIONAL HOOKS]
  const { setData } = useFunctions()
  const { conditionsEndingSelectPlaceholder } = useTranslation()

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
    <NumberedCard top="24px" number={index + 1} key={index}>
      <Title
        color="var(--qf-typography-title-color)"
        textOverflow="ellipsis"
        level={5}
        mb={2}>
        {item?.title}
      </Title>

      <Select
        allowClear
        width="100%"
        mode="multiple"
        listHeight="300px"
        onChange={handleChange}
        defaultValue={defaultSelectValue}
        placeholder={
          conditionsEndingSelectPlaceholder ||
          TEXTINGS.conditionsEndingSelectPlaceholder
        }>
        {questionsData?.map((questionListItem, index) => (
          <AntSelect.OptGroup
            key={index}
            label={
              <Box display="flex">
                <LetterBox px={2} mr={2}>
                  <Text
                    color="var(--qf-typography-subtitle-color)"
                    fontSize="var(--qf-typography-fs-body)"
                    strong>
                    {questionListItem?.order}
                  </Text>
                </LetterBox>
                <Text
                  color="var(--qf-typography-caption-color)"
                  fontSize="var(--qf-typography-fs-body)">
                  {questionListItem?.title || 'No question text'}
                </Text>
              </Box>
            }>
            {questionListItem?.questionConfigurations?.map(
              (questionAnswerItem, ind) => (
                <AntSelect.Option
                  key={questionAnswerItem?.answerOptionId}
                  value={`${questionListItem?.id} ${index}${ind}`}>
                  <Box display="flex">
                    <Text
                      color="var(--qf-typography-subtitle-color)"
                      fontSize="var(--qf-typography-fs-body)"
                      strong>
                      {questionListItem?.order}

                      {String.fromCharCode(startLetter + ind)}
                    </Text>
                    <Divider height="auto" type="vertical" />
                    <Text
                      color="var(--qf-typography-title-color)"
                      fontSize="var(--qf-typography-fs-body)">
                      {questionAnswerItem?.answerOption || '-'}
                    </Text>
                  </Box>
                </AntSelect.Option>
              )
            )}
          </AntSelect.OptGroup>
        ))}
      </Select>
    </NumberedCard>
  )
}
EndingSimpleView.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  questionsData: PropTypes.array.isRequired
}
export default EndingSimpleView
