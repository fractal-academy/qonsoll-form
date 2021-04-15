import { firestore } from '../Firebase'
import setData from './setData'
import getData from './getData'
import getDataWithFilter from './getDataWithFilter'
import getCollectionRef from './getCollectionRef'
import getOrderedData from './getOrderedData'
import getTimestamp from './getTimestamp'
import addData from './addData'
import deleteData from './deleteData'
import setDocumentListener from './setDocumentListener'
import updateData from './updateData'
export {
  updateData,
  setDocumentListener,
  deleteData,
  addData,
  setData,
  getData,
  firestore,
  getDataWithFilter,
  getCollectionRef,
  getOrderedData,
  getTimestamp
}
