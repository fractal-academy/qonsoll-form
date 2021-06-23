import PropTypes from 'prop-types'
import React, { useState, cloneElement } from 'react'
import { Box } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../../components'
import Title from 'antd/lib/typography/Title'
import { QUESTION_TYPES } from '../../../../../constants'
import { Select, Tag } from 'antd'
import styled from 'styled-components'
import { DeleteOutlined, StepForwardOutlined } from '@ant-design/icons'

const StyledTag = styled(Tag)`
  background-color: ${({ theme }) => theme.color.primary.t.lighten5};
  //padding: 12px;
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

  console.log(questionsData)

  function handleChange(order, title) {
    console.log(`selected ${title}`)
  }
  const questionTypesMap = {
    [QUESTION_TYPES.ENDING]: {
      component: <>Ending.</>
    }
  }
  const questYesNo = 'Yes/No'
  console.log(questionsData)
  console.log(questionsData.layoutType === questYesNo)

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
          placeholder="Select question for current ending"
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
                    key={ind}
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
                      {questionsData.layoutType === questYesNo
                        ? 'Y'
                        : String.fromCharCode(startLetter + ind)}
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
