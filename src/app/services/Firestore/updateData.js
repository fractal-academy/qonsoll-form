import { getCollectionRef } from './'
const updateData = (collection, document, data) => {
  return getCollectionRef(collection).doc(document).update(data)
}
export default updateData
