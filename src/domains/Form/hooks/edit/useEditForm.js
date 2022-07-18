import { COLLECTIONS } from '../../../../constants'
import { message } from 'antd'
import useFunctions from '../../../../hooks/useFunctions'

const useEditForm = () => {
  // [ADDITIONAL HOOKS]
  const { getTimestamp, setData } = useFunctions()

  const editForm = async (data) => {
    const { id, title, subtitle, isQuiz, ...restData } = data

    const formData = {
      ...restData,
      title,
      subtitle,
      id,
      isQuiz: !!isQuiz,
      creationDate: getTimestamp().now()
    }
    await setData(COLLECTIONS.FORMS, id, formData).catch((e) =>
      message.error(e.message)
    )
  }

  return editForm
}

export default useEditForm
