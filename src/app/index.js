import { Row, Col, Box } from '@qonsoll/react-design'
import { InputForm } from 'components'
import { Button, Form, Typography } from 'antd'

const btnProps = {
  children: 'SUBMIT',
  type: 'secondary',
  size: 'small',
  shape: 'circle'
}
const inputProps = {
  placeholder: 'Input name',
  type: 'date'
}
const btnProps2 = {
  children: 'Enter your name'
}
const inputProps3 = {
  placeholder: 'Input placeholder'
}

const App = () => {
  return (
    <>
      <Row m={100}>
        <Col cw="auto">
          <InputForm inputProps={inputProps} btn={<Button {...btnProps2} />} />
        </Col>
      </Row>
      <Row m={100}>
        <Col cw="auto">
          <InputForm
            btnProps={{ children: 'Finish' }}
            inputProps={inputProps3}
          />
        </Col>
      </Row>
    </>
  )
}

export default App
