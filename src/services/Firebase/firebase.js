import firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

import { FIREBASE_CONFIG } from 'app/constants'

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
} else {
  firebase.app()
}

const auth = firebase.auth()
const storage = firebase.storage()
const firestore = firebase.firestore()

export default firebase

export { auth, storage, firestore }
