import { message } from 'antd'
import { getCollectionRef } from './'

/**
 * @param {string} collection - collection name.
 * @param {string} [document] - document id.
 * @returns {Object} - object where key - docId, value - docData.
 * */

async function getData(collection, document) {
  let result = {}
  if (document) {
    try {
      result = await getCollectionRef(collection).doc(document).get()
      if (!result.exists) {
        return Promise.reject(new Error('document not exist.'))
      }
      result = await result.data()
      return result
    } catch (e) {
      message.error(e)
    }
  }
  let res
  try {
    res = await getCollectionRef(collection).get()
    if (res.empty) {
      return Promise.reject(new Error('Empty collection'))
    }
  } catch (e) {
    return Promise.reject(e)
  }

  res.docs.forEach((doc) => {
    result = { ...result, [doc.id]: doc.data() }
  })
  return result
}

export default getData
