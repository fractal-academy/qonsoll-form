import addData from '../services/addData'
import deleteData from '../services/deleteData'
import getCollectionRef from '../services/getCollectionRef'
import getTimestamp from '../services/getTimestamp'
import setData from '../services/setData'
import storage from '../services/storage'
import updateData from '../services/updateData'
import { useFirebaseContext } from '../context/Firebase/useFirebaseContext'

const useFunctions = (FB) => {
  const firebase = useFirebaseContext()
  return {
    getCollectionRef: (collection) =>
      getCollectionRef(firebase || FB, collection),

    getTimestamp: () => getTimestamp(firebase || FB),

    setData: (collection, document, data) =>
      setData(firebase || FB, collection, document, data),

    addData: (collection, data) => addData(firebase || FB, collection, data),

    deleteData: (collection, document) =>
      deleteData(firebase || FB, collection, document),

    updateData: (collection, document, data) =>
      updateData(firebase || FB, collection, document, data),

    storage: storage(firebase || FB)
  }
}
export default useFunctions
