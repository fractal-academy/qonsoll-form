import  getCollectionRef  from "./getCollectionRef"
const updateData = (firebase,collection, document, data) => {
  return getCollectionRef(firebase,collection).doc(document).update(data)
}
export default updateData
