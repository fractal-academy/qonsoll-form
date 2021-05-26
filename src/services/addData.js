import getCollectionRef from "./getCollectionRef"

/**
 * @param {string} collection - collection name.
 * @param {object} data - A map of the fields and values for the document.
 * @returns {Promise}
 * */

function addData(firebase,collection, data) {
  return getCollectionRef(firebase,collection).add(data)
}
export default addData
