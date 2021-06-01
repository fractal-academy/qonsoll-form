import { useContext } from 'react'
import { FirebaseContext } from './FirebaseContext'

export const useFirebaseContext = () => useContext(FirebaseContext)
