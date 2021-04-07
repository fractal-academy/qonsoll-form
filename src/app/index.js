import { Button } from 'antd'
import { firestore } from 'app/services'
import TextEditable from './components/GlobalComponents/TextEditable'

const App = () => {
  // const onClick = () => {
  //   firestore
  //     .collection('test')
  //     .get()
  //     .then((res) => res.docs.forEach((item) => console.log(item.data())))
  // }

  return <TextEditable textSecondary />
}

export default App
