import './YesnoButton.styles.css'
import { Typography } from 'antd'
import { Button } from 'app/components'
import { Row, Col, Box } from '@qonsoll/react-design'

const YesnoButton = (props) => {
  const { conditions } = props

  const onButtonClick = () => {}

  const yeslayout = (
    <Row display="flex" v="center">
      <Col className="buttonBox" mr={2}>
        Y
      </Col>
      <Typography.Text>Yes</Typography.Text>
    </Row>
  )
  const nolayout = (
    <Row display="flex" v="center">
      <Col className="buttonBox" mr={2}>
        N
      </Col>
      <Typography.Text>No</Typography.Text>
    </Row>
  )

  return (
    <Box display="block">
      <Box mb={2}>
        <Button
          buttonType="secondary"
          layout={yeslayout}
          onClick={onButtonClick}
        />
      </Box>
      <Button
        buttonType="secondary"
        layout={nolayout}
        onClick={onButtonClick}
      />
    </Box>
  )
}

export default YesnoButton
