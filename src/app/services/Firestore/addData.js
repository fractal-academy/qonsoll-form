import { getCollectionRef } from './'

/**
 * @param {string} collection - collection name.
 * @param {object} data - A map of the fields and values for the document.
 * @returns {Promise}
 * */

function addData(collection, data) {
  return getCollectionRef(collection).add(data)
}
export default addData
