import { Divider, Select, Typography } from 'antd'
import React, { useMemo } from 'react'

import { COLLECTIONS } from '../../../../../constants'
import LetterBox from '../../LetterBox'
import { NumberedCard } from '../../../../../components'
import PropTypes from 'prop-types'
import useFunctions from '../../../../../hooks/useFunctions'
import { useTranslations } from '@qonsoll/translation'

const { Title, Text } = Typography
const { Option, OptGroup } = Select

let startLetter = 65

function EndingSimpleView(props) {
  const { item, index, questionsData } = props

  // [ADDITIONAL HOOKS]
  const { setData } = useFunctions()
  const { t } = useTranslations()

  // [CLEAN FUNCTIONS]
  async function handleChange(_, selectedItems) {
    const questionConfigurations = selectedItems?.map((item) => {
      return {
        answerOptionId: item?.key,
        triggerQuestionId: item?.value || ''
      }
    })
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
        fontFamily="var(--ql-font-family-main)"
        textOverflow="ellipsis"
        level={5}
        mb="8px"
      >
        {item?.title}
      </Title>

      <Select
        allowClear
        width="100%"
        mode="multiple"
        listHeight={300}
        onChange={handleChange}
        defaultValue={defaultSelectValue}
        placeholder={t('Select questions to call current ending')}
      >
        {questionsData?.map((questionListItem, index) => (
          <OptGroup
            key={`${questionListItem}-${index}`}
            label={
              <div display="flex">
                <LetterBox px={2} mr="8px">
                  <Text
                    color="var(--qf-typography-subtitle-color)"
                    fontSize="var(--qf-typography-fs-body)"
                    strong
                  >
                    {questionListItem?.order}
                  </Text>
                </LetterBox>
                <Text
                  color="var(--qf-typography-caption-color)"
                  fontSize="var(--qf-typography-fs-body)"
                >
                  {questionListItem?.title || t('No question text')}
                </Text>
              </div>
            }
          >
            {questionListItem?.questionConfigurations?.map(
              (questionAnswerItem, ind) => (
                <Option
                  value={`${questionListItem?.id} ${index}${ind}`}
                  key={questionAnswerItem?.answerOptionId}
                >
                  <div display="flex">
                    <Text
                      color="var(--qf-typography-subtitle-color)"
                      fontSize="var(--qf-typography-fs-body)"
                      strong
                    >
                      {questionListItem?.order}
                      {String.fromCharCode(startLetter + ind)}
                    </Text>
                    <Divider height="auto" type="vertical" />
                    <Text
                      color="var(--qf-typography-title-color)"
                      fontSize="var(--qf-typography-fs-body)"
                    >
                      {questionAnswerItem?.answerOption || '-'}
                    </Text>
                  </div>
                </Option>
              )
            )}
          </OptGroup>
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
