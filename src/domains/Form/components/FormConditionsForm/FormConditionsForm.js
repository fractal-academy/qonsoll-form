import React from 'react'
import { ConditionForm } from '../../../../domains/Condition/components'
import { Box } from '@qonsoll/react-design'
import useFunctions from '../../../../hooks/useFunctions'
import { COLLECTIONS } from '../../../../constants'

function FormConditionsForm(props) {
  const { data } = props

  // [ADDITIONAL HOOKS]
  const { setData } = useFunctions()

  // [CLEAN FUNCTIONS]
  const getQuestionListRedirect = (itemIndex) => {
    return data?.filter((item, index) => itemIndex !== index)
  }

  const addCondition = (answer, index) => {
    setData(COLLECTIONS.QUESTIONS, data?.[index]?.id, {
      questionConfigurations: [...data?.[index]?.questionConfigurations, answer]
    })
  }

  const addRedirectQuestion = (nextQuestion, answerIndex, index) => {
    //create new array questionConfigurations of certain question
    const updatedQuestionConfigurations = data[index]?.questionConfigurations
    //update redirect question of certain question
    updatedQuestionConfigurations[answerIndex].redirectQuestion = nextQuestion

    //write new data to db
    setData(COLLECTIONS.QUESTIONS, data[index]?.id, {
      questionConfigurations: updatedQuestionConfigurations
    })
  }

  return (
    <>
      {data?.map((item, index) => (
        <Box mb={3}>
          <ConditionForm
            key={index}
            item={item}
            index={index}
            addCondition={addCondition}
            addRedirectQuestion={addRedirectQuestion}
            getQuestionListRedirect={getQuestionListRedirect}
          />
        </Box>
      ))}
    </>
  )
}

FormConditionsForm.propTypes = {}

export default FormConditionsForm
