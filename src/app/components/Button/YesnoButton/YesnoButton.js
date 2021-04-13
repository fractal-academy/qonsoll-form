import { useEffect } from 'react'
import './YesnoButton.styles.css'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import { Button } from 'app/components'
import { Row, Col, Box } from '@qonsoll/react-design'
// import { useTranslation } from 'react-i18next'

function YesnoButton(props) {
  const { conditions } = props

  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
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

YesnoButton.propTypes = {
  conditions: PropTypes.array
}

export default YesnoButton
