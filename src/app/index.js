import { Row, Col, Box } from '@qonsoll/react-design'
import { Button, Form, Typography } from 'antd'
import { ChoiseInput, DateTimeInput, InputForm } from 'components'

const App = () => {
  return (
    <>
      <Row m={20}>
        <Col cw="auto">
          <DateTimeInput />
        </Col>
      </Row>
      <Row m={20}>
        <Col cw="auto">
          <ChoiseInput />
        </Col>
      </Row>
      <Row m={30}>
        <Col cw="auto">
          <InputForm
            btnProps={{ type: 'primary', children: 'Ok' }}
            inputProps={{ placeholder: 'Enter your answer here...' }}
          />
        </Col>
      </Row>
    </>
  )
}

export default App
