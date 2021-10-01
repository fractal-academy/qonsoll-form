import React, { useState } from 'react'
import { Container, Text, Input } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'

function ExtentionItem(props) {
  const { index, item, ratingProps, onClick } = props

  // [COMPONENT STATE HOOKS]
  const [itemValue, setItemValue] = useState()

  // [CUSTOM HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [CLEAN FUNCTIONS]
  const onItemChange = (e) => {
    setItemValue(e.target.value)
  }
  const onItemBlur = async () => {
    if (ratingProps?.[index]?.answerOption === itemValue) return

    ratingProps[index].answerOption = itemValue || ''
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { ratingAdditionalOptions: ratingProps }
    })
  }

  return (
    <Container>
      {onClick ? (
        <Text color="var(--qf-typography-subtitle-color)">
          {item?.answerOption || ''}
        </Text>
      ) : (
        <>
          <Input
            p={0}
            index={index}
            onChange={onItemChange}
            onBlur={onItemBlur}
            defaultValue={item?.answerOption || ''}
            background="transparent"
            borderColor="transparent"
            color="var(--qf-typography-subtitle-color)"
          />
        </>
      )}
    </Container>
  )
}

export default ExtentionItem
