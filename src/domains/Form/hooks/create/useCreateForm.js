import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'

import { LAYOUT_TYPE_KEYS } from '../../../../constants/layoutTypes'
import { message } from 'antd'
import useFunctions from '../../../../hooks/useFunctions'
import { useTranslations } from '@qonsoll/translation'

const useCreateForm = (firebase) => {
  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const { getCollectionRef, getTimestamp, setData } = useFunctions(firebase)

  const createForm = async (data) => {
    const { title, subtitle, isQuiz, ...restData } = data

    const formId = getCollectionRef(COLLECTIONS.FORMS).doc().id
    const formData = {
      ...restData,
      title,
      subtitle,
      id: formId,
      isQuiz: !!isQuiz,
      creationDate: getTimestamp().now()
    }
    await setData(COLLECTIONS.FORMS, formId, formData).catch((e) =>
      message.error(e.message)
    )

    //generate default question id and default ending id
    const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
    const endingId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id

    //add default question and ending to database
    setData(COLLECTIONS.QUESTIONS, questionId, {
      formId: formId,
      id: questionId,
      layoutType: LAYOUT_TYPE_KEYS[0],
      questionType: QUESTION_TYPES.WELCOME_SCREEN,
      title: t('Welcome screen'),
      order: 0
    }).catch((e) => message.error(e.message))
    setData(COLLECTIONS.QUESTIONS, endingId, {
      formId: formId,
      id: endingId,
      layoutType: LAYOUT_TYPE_KEYS[0],
      questionType: QUESTION_TYPES.ENDING,
      title: t('Thank you for attention!'),
      order: 1
    }).catch((e) => message.error(e.message))
  }

  return createForm
}

export default useCreateForm
