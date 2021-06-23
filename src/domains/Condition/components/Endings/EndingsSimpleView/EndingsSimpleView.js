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
  margin-right: 10px !important;
  font-size: 20px;
`

function ConditionForm(props) {
  const { Option } = Select

  const { item, index, questionsData } = props
  console.log(questionsData)

  function handleChange(order, title) {
    console.log(`selected ${title}`)
  }
  const questionTypesMap = {
    [QUESTION_TYPES.ENDING]: {
      component: <>Ending.</>
    }
  }

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
          {questionsData?.map((item, index) => (
            <Option
              label={
                <>
                  <StyledTag>{item?.order}</StyledTag>
                  {item?.title || item?.order}
                </>
              }
              key={index}>
              <StyledTag>{item.order}</StyledTag>
              {item?.title || item?.order}
            </Option>
          ))}
        </Select>
        {/*  {cloneElement(questionTypesMap[item?.questionType].component, {*/}
        {/*    ...item,*/}
        {/*    addCondition: (answer) => addCondition(answer, index),*/}
        {/*    addRedirectQuestion: (question, answerIndex) =>*/}
        {/*      addRedirectQuestion(question, answerIndex, index),*/}
        {/*    questionList: getQuestionListRedirect(index)*/}
        {/*})}*/}
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
