import { useEffect } from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import { Button } from 'app/components'
import { Row, Col, Box } from '@qonsoll/react-design'
// import { useTranslation } from 'react-i18next'

function ChoiceButton(props) {
  const { conditions, choices } = props

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  let startLetter = 65

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
      {choices.map((item) => (
        <Box key={item} mb={2}>
          <Button buttonType="secondary" onClick={onButtonClick}>
            <Row display="flex" v="center">
              <Col className="buttonBox" mr={2}>
                {String.fromCharCode(startLetter++)}
              </Col>
              <Typography.Text>{item}</Typography.Text>
            </Row>
          </Button>
        </Box>
      ))}
    </Box>
  )
}

ChoiceButton.propTypes = {
  conditions: PropTypes.array,
  choices: PropTypes.array
}

export default ChoiceButton
