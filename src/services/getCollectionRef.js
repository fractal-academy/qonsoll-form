

/**
 * @param {string} collection - path to a collection.
 * @returns The CollectionReference instance.
 * */

function getCollectionRef(firebase,collection) {
  return firebase?.firestore().collection(collection)
}

export default getCollectionRef
