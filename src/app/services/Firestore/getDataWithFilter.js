import { getCollectionRef } from './'

async function getDataWithFilter(collection, arrayRequests) {
  /*arrayRequests must be an array. Array should has 1 or 2 elements
   */
  let result = {}
  arrayRequests.length === 1
    ? await getCollectionRef(collection)
        .where(
          arrayRequests[0].field,
          arrayRequests[0].operator,
          arrayRequests[0].request
        )
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map(
            (doc) => (result = { ...result, [doc.id]: doc.data() })
          )
        })
    : await getCollectionRef(collection)
        .where(
          arrayRequests[0].field,
          arrayRequests[0].operator,
          arrayRequests[0].request
        )
        .where(
          arrayRequests[1].field,
          arrayRequests[1].operator,
          arrayRequests[1].request
        )
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map(
            (doc) => (result = { ...result, [doc.id]: doc.data() })
          )
        })
  return result
}

export default getDataWithFilter
