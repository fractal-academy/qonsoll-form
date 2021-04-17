import 'antd/dist/antd.css'
import { ChoiceForm } from './components'
import { Row, Col } from '@qonsoll/react-design'

const App = (props) => {
  return (
    <>
      {/* insert map of routes*/}
      <Row>
        <Col>
          <ChoiceForm />
        </Col>
      </Row>
    </>
  )
}

export default App
