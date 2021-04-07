import { Button } from 'antd'
import { firestore } from 'app/services'
import { QuestionHeader } from 'components'
import { Row, Col } from '@qonsoll/react-design'

const App = () => {
  // const onClick = () => {
  //   firestore
  //     .collection('test')
  //     .get()
  //     .then((res) => res.docs.forEach((item) => console.log(item.data())))
  // }

  return (
    <Row>
      <Col>
        <QuestionHeader
          titlePlaceholder="New title"
          subtitlePlaceholder="New subtitle"
        />
      </Col>
    </Row>
  )
}

export default App
