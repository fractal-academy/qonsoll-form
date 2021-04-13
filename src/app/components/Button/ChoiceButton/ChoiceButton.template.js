import { Typography } from 'antd'
import PropTypes from 'prop-types'
import { Button } from 'app/components'
import { Row, Col, Box } from '@qonsoll/react-design'

const ChoiceButton = (props) => {
  const { conditions, choices } = props

  const onButtonClick = () => {}

  const layout = (letter, item) => (
    <Row display="flex" v="center">
      <Col className="buttonBox" mr={2}>
        {letter}
      </Col>
      <Typography.Text>{item}</Typography.Text>
    </Row>
  )

  let startLetter = 65

  return (
    <Box display="block">
      {choices.map((item) => (
        <Box key={item} mb={2}>
          <Button
            buttonType="secondary"
            layout={layout(String.fromCharCode(startLetter++), item)}
            onClick={onButtonClick}
          />
        </Box>
      ))}
    </Box>
  )
}

ChoiceButton.propTypes = {
  conditions: PropTypes.array,
  buttonText: PropTypes.string
}

export default ChoiceButton
