import firebase from '../Firebase'

/**
 *
 * @returns {firebase.firestore.Timestamp}
 */
const getTimestamp = () => firebase.firestore.Timestamp

export default getTimestamp
