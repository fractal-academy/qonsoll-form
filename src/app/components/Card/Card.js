import './Card.styles.css'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'
// import { useTranslation } from 'react-i18next'

function Card(props) {
  const { number, children } = props

  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

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
    <Box position="relative">
      <Box className="hiddenBox"></Box>
      <Box className="contentBox">{children}</Box>
      <Box className="numberBox">{number}</Box>
    </Box>
  )
}

Card.propTypes = {
  number: PropTypes.number,
  children: PropTypes.node
}

export default Card
