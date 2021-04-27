import React, { useEffect, useState } from 'react'
import { QuestionTitle, QuestionSubtitle } from 'components'
import { Row, Col } from '@qonsoll/react-design'

//import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function QuestionHeader(props) {
  const { titlePlaceholder, subtitlePlaceholder } = props
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
    <>
      <Row noGutters>
        <Col>
          <QuestionTitle placeholder={titlePlaceholder} />
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <QuestionSubtitle placeholder={subtitlePlaceholder} />
        </Col>
      </Row>
    </>
  )
}

QuestionHeader.propTypes = {}

export default QuestionHeader
