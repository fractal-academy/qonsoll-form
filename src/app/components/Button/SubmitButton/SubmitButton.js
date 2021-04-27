import { useEffect } from 'react'
import './SubmitButton.styles.css'
import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { Button } from 'app/components'
import { Row, Col, Box } from '@qonsoll/react-design'
import { CheckOutlined } from '@ant-design/icons'
// import { useTranslation } from 'react-i18next'

const { Text } = Typography

function SubmitButton(props) {
  const { children, onClick } = props

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  const onButtonClick = () => {
    onClick && onClick()
  }

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
        <Button buttonType="primary" className="submit" onClick={onButtonClick}>
          {children ? (
            children
          ) : (
            <Row display="flex">
              <Col mr={2}>OK</Col>
              <Col>
                <CheckOutlined />
              </Col>
            </Row>
          )}
        </Button>
      </Col>
      <Col>
        <Text>
          Press <b>Enter ↵</b>
        </Text>
      </Col>
    </Row>
  )
}

SubmitButton.propTypes = {}

export default SubmitButton
