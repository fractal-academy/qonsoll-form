import React, { useEffect, useState } from 'react'
import QUESTION_TYPES, {
  QUESTION_TYPE_VALUES
} from 'app/constants/quetstionType'
import { Col, Row } from '@qonsoll/react-design'
import { Option } from 'antd/es/mentions'
import { Menu, Select } from 'antd'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function QuestionTypesList(props) {
  const { Option } = Select
  const { onChange } = props

  // const { WRITE_PROPS_HERE } = props
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
    <Menu onChange={onChange} style={{ height: '300px', overflow: 'auto' }}>
      {QUESTION_TYPE_VALUES.map((item, index) => (
        <Menu.Item key={index} value={item}>
          {item}
        </Menu.Item>
      ))}
    </Menu>
  )
}

QuestionTypesList.propTypes = {}

export default QuestionTypesList
