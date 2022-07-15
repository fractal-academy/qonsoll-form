import { COLLECTIONS } from '../../../../constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import useFunctions from '../../../../hooks/useFunctions'

const useGetAnswersByForm = (formId) => {
  // [CUSTOM_HOOKS]
  const { getCollectionRef } = useFunctions()

  const [answers, answersLoading, andswersError] = useCollectionData(
    formId &&
      getCollectionRef(COLLECTIONS.ANSWERS).where('formId', '==', formId)
  )

  return [answers, answersLoading, andswersError]
}

export default useGetAnswersByForm
