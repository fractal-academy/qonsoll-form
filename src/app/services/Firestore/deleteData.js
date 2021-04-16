import { getCollectionRef } from './'

/**
 * @param {string} collection - collection name.
 * @param {string} document - document id.
 * @returns {Promise}
 * */

function deleteData(collection, document) {
  return getCollectionRef(collection).doc(document).delete()
}
export default deleteData
