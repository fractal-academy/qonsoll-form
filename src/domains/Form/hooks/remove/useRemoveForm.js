import {
  useGetAnswersByForm,
  useGetUserAnswersGroup
} from '../../../Response/hooks/get'

import { COLLECTIONS } from '../../../../constants'
import { message } from 'antd'
import { useActionsFunctionsContext } from '../../../../context/ActionsFunctions/useActionsFunctionsContext'
import useFunctions from '../../../../hooks/useFunctions'
import { useGetQuestionsByForm } from '../../../Question/hooks/get'

const useRemoveForm = (form) => {
  // [ADDITIONAL HOOKS]
  const [answers] = useGetAnswersByForm(form?.id)
  const [questions] = useGetQuestionsByForm(form?.id)
  const [userAnswersGroup] = useGetUserAnswersGroup(form?.id)

  const { deleteData } = useFunctions()
  const { onFormDelete } = useActionsFunctionsContext()

  const removeForm = async () => {
    await deleteData(COLLECTIONS.FORMS, form?.id)
      .then(deleteQuestions)
      .then(deleteAnswers)
      .then(deleteUserAnswersGroup)
      .then(() => {
        onFormDelete?.(form?.buyingTypeId)
      })
      .catch((error) => message.error(error.message))
  }

  //removind all form questions
  const deleteQuestions = () => {
    questions?.forEach((item) => {
      deleteData(COLLECTIONS.QUESTIONS, item?.id).catch((error) =>
        message.error(error.message)
      )
    })
  }

  //removing all answers given to form
  const deleteUserAnswersGroup = () => {
    userAnswersGroup?.forEach((item) => {
      deleteData(COLLECTIONS.USER_ANSWERS_GROUP, item?.id).catch((error) =>
        message.error(error.message)
      )
    })
  }
  const deleteAnswers = () => {
    answers?.forEach((item) => {
      deleteData(COLLECTIONS.ANSWERS, item?.id).catch((error) =>
        message.error(error.message)
      )
    })
  }

  return removeForm
}

export default useRemoveForm
