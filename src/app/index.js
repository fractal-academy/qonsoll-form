import { Button } from 'antd'
import { firestore } from 'app/services'
import { PageHeader } from 'components'

const App = () => {
  // const onClick = () => {
  //   firestore
  //     .collection('test')
  //     .get()
  //     .then((res) => res.docs.forEach((item) => console.log(item.data())))
  // }

  return <PageHeader title="Form" />
}

export default App
