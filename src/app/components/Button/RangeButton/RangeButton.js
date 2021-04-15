import { useEffect } from 'react'
import PropTypes from 'prop-types'
import './RangeButton.styles.css'
import { Button } from 'app/components'
import { Box } from '@qonsoll/react-design'
// import { useTranslation } from 'react-i18next'

const ButtonGroup = Button.Group

function RangeButton(props) {
  const { from = 0, to = 0 } = props

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  const range = Array(to - from + 1)
    .fill(0)
    .map((el, index) => from + index)

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
    <Box display="flex">
      {range.map((item) => (
        <Button
          key={item}
          buttonType="secondary"
          className="range"
          onClick={onButtonClick}>
          <b>{item}</b>
        </Button>
      ))}
    </Box>
  )
}

RangeButton.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired
}

export default RangeButton
