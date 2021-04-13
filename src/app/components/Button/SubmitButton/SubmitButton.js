import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { Button } from 'app/components'
import { Row, Col, Box } from '@qonsoll/react-design'
import { CheckOutlined } from '@ant-design/icons'
// import { useTranslation } from 'react-i18next'

const { Text } = Typography

function SubmitButton(props) {
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  const onButtonClick = () => {}

  const layout = (
    <Box display="flex">
      <Text>
        {' '}
        OK <CheckOutlined />
      </Text>
    </Box>
  )

  // [CLEAN FUNCTIONS]

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

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

SubmitButton.propTypes = {}

export default SubmitButton
