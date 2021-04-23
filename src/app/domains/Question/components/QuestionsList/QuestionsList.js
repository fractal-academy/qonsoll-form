import React, { useEffect } from 'react'
import { DragableList } from 'app/components'
import QuestionSimpleView from 'domains/Question/components/QuestionSimpleView'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function QuestionsList(props) {
  const { data } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onUpdate = () => {}

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
    <DragableList
      itemLayout="horizontal"
      dataSource={data}
      onUpdate={onUpdate}
      renderItem={(item, index) => (
        <QuestionSimpleView {...item} number={index + 1} />
      )}
    />
  )
}

QuestionsList.propTypes = {
  data: PropTypes.array
}

export default QuestionsList
