import getCollectionRef from './getCollectionRef'

/**
 * @param {string} collection - collection name.
 * @param {string} document - document id.
 * @returns {Promise}
 * */

function deleteData(firebase, collection, document) {
  return getCollectionRef(firebase, collection).doc(document).delete()
}
export default deleteData
