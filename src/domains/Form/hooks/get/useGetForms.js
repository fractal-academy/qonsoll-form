import { COLLECTIONS } from '../../../../constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import useFunctions from '../../../../hooks/useFunctions'

const useGetForms = (firebase) => {
  // [CUSTOM_HOOKS]
  const { getCollectionRef } = useFunctions(firebase)

  const [forms, formsLoading, formsError] = useCollectionData(
    getCollectionRef(COLLECTIONS.FORMS).orderBy('creationDate', 'desc')
  )

  return [forms, formsLoading, formsError]
}

export default useGetForms
