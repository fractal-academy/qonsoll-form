import { COLLECTIONS } from '../../../../constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import useFunctions from '../../../../hooks/useFunctions'

const useGetUserAnswersGroup = (formId) => {
  // [CUSTOM_HOOKS]
  const { getCollectionRef } = useFunctions()

  const [userAnswersGroup, userAnswersGroupLoading, userAnswersGroupError] =
    useCollectionData(
      formId &&
        getCollectionRef(COLLECTIONS.USER_ANSWERS_GROUP).where(
          'formId',
          '==',
          formId
        )
    )

  return [userAnswersGroup, userAnswersGroupLoading, userAnswersGroupError]
}

export default useGetUserAnswersGroup
