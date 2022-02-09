import { Container, Input, Text } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'
import React, { useEffect, useState } from 'react'

function ExtentionItem(props) {
  const { index, item, ratingProps, onClick } = props

  // [COMPONENT STATE HOOKS]
  const [itemValue, setItemValue] = useState(item?.answerOption)

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

  // [USE_EFFECTS]
  useEffect(() => {
    //update text area value when delete element
    setItemValue(item?.answerOption)
  }, [item])

  return (
    <Container>
      {onClick ? (
        <Text color="var(--qf-typography-subtitle-color)">
          {item?.answerOption || ''}
        </Text>
      ) : (
        <Input
          p={0}
          maxLength={250}
          index={index}
          onChange={onItemChange}
          onBlur={onItemBlur}
          value={itemValue}
          background="transparent"
          borderColor="transparent"
          color="var(--qf-typography-subtitle-color)"
        />
      )}
    </Container>
  )
}

export default ExtentionItem
