import { COLLECTIONS } from '../../../../constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import useFunctions from '../../../../hooks/useFunctions'

const useGetQuestionsByForm = (formId) => {
  // [CUSTOM_HOOKS]
  const { getCollectionRef } = useFunctions()

  const [questions, questionsLoading, questionsError] = useCollectionData(
    formId &&
      getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', formId)
  )

  return [questions, questionsLoading, questionsError]
}

export default useGetQuestionsByForm
