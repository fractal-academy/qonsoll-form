import { Button } from 'antd'
import { firestore } from 'app/services'
import { TextAreaForm } from 'components'
import { Col, Container, Row } from '@qonsoll/react-design'
import { PlusOutlined } from '@ant-design/icons'
//
// const textAreaProps = {}
const btnProps = {
  icon: <PlusOutlined />,
  children: 'qwewqe',
  type: 'primary',
  size: 'large'
}

const App = () => {
  // const onClick = () => {
  //   firestore
  //     .collection('test')
  //     .get()
  //     .then((res) => res.docs.forEach((item) => console.log(item.data())))
  // }

  return (
    <>
      <Container>
        <Col>
          <Row>
            <TextAreaForm
              longText
              noBorder
              btnProps={btnProps}
              // textAreaProps={textAreaProps}
            />
          </Row>
        </Col>
      </Container>
    </>
  )
}

export default App
