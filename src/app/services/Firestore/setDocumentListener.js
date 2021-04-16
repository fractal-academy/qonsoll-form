import { getCollectionRef } from './'

const setDocumentListener = (collection, document, onSnapshot) => {
  return getCollectionRef(collection).doc(document).onSnapshot(onSnapshot)
}
export default setDocumentListener
