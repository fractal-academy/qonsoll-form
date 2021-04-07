import { Button } from 'antd'
import { firestore } from 'app/services'
import { FileUploader, ImageUploader } from 'components'

const App = () => {
  // const onClick = () => {
  //   firestore
  //     .collection('test')
  //     .get()
  //     .then((res) => res.docs.forEach((item) => console.log(item.data())))
  // }

  return <ImageUploader />
}

export default App
