import { Typography } from 'antd'
import { Button } from 'app/components'
import { Row, Col, Box } from '@qonsoll/react-design'
import { CheckOutlined } from '@ant-design/icons'

const { Text } = Typography

const SubmitButton = (props) => {
  const onButtonClick = () => {}

  const layout = (
    <Box display="flex">
      <Text>
        {' '}
        OK <CheckOutlined />
      </Text>
    </Box>
  )

  return (
    <Row display="flex" v="center">
      <Col cw="auto" mr={2}>
        <Button
          buttonType="primary"
          layout={layout}
          buttonText="choice1"
          onClick={onButtonClick}
        />
      </Col>
      <Col>
        <Text>
          press <b>Enter ↵</b>
        </Text>
      </Col>
    </Row>
  )
}

export default SubmitButton
