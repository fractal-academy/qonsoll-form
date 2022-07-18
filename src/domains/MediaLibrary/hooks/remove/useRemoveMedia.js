import { COLLECTIONS } from '../../../../constants'
import { message } from 'antd'
import useFunctions from '../../../../hooks/useFunctions'
import { useState } from 'react'

const useRemoveMedia = () => {
  // [COMPONENT STATE HOOKS]
  const [removeLoading, setRemoveLoading] = useState(false)

  // [ADDITIONAL HOOKS]
  const { deleteData } = useFunctions()

  const removeMedia = async (data) => {
    setRemoveLoading(true)
    await deleteData(COLLECTIONS.MEDIA, data?.id).catch((e) =>
      message.error(e.message)
    )

    setRemoveLoading(false)
  }

  return { removeMedia, removeLoading }
}

export default useRemoveMedia
