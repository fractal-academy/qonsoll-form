import { useEffect } from 'react'
import './YesnoButton.styles.css'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import { Button } from 'app/components'
import { Row, Col, Box } from '@qonsoll/react-design'
// import { useTranslation } from 'react-i18next'

function YesnoButton(props) {
  const { conditions } = props

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onButtonClick = () => {}

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
    <Box display="block">
      <Box mb={2}>
        <Button buttonType="secondary" onClick={onButtonClick}>
          <Row display="flex" v="center">
            <Col className="buttonBox" mr={2}>
              Y
            </Col>
            <Typography.Text>Yes</Typography.Text>
          </Row>
        </Button>
      </Box>
      <Button buttonType="secondary" onClick={onButtonClick}>
        <Row display="flex" v="center">
          <Col className="buttonBox" mr={2}>
            N
          </Col>
          <Typography.Text>No</Typography.Text>
        </Row>
      </Button>
    </Box>
  )
}

YesnoButton.propTypes = {
  conditions: PropTypes.array
}

export default YesnoButton
