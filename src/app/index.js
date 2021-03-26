import { Button } from 'antd'
import { firestore } from 'app/services'

const App = () => {
  // const onClick = () => {
  //   firestore
  //     .collection('test')
  //     .get()
  //     .then((res) => res.docs.forEach((item) => console.log(item.data())))
  // }

  return <Button type="primary">Hello</Button>
}

export default App
