import { firestore } from './'

/**
 * @param {string} collection - path to a collection.
 * @returns The CollectionReference instance.
 * */

function getCollectionRef(collection) {
  return firestore.collection(collection)
}

export default getCollectionRef
