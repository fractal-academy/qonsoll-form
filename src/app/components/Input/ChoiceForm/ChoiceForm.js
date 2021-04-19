import React, { useEffect, useState } from 'react'
import { Typography, Input, Button } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import { ChoiceInput, ImageUploader } from 'components'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { globalStyles } from '~/app/styles'
// import { useTranslation } from 'react-i18next'

const { Text } = Typography
const { TextArea } = Input

let startLetter = 65

function ChoiceForm(props) {
  const { withImage } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})
  const [choices, setChoices] = useState([])

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onAddChoice = () => {
    setChoices((prev) => [...prev, { value: '', keyLetter: startLetter++ }])
  }
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
  console.log(withImage)
  return (
    <Box
      display="flex"
      flexDirection={withImage ? 'row' : 'column'}
      flexWrap="wrap">
      {choices.map((item, index) => (
        <ChoiceInput
          key={index}
          data={item}
          index={index}
          withImage={withImage}
        />
      ))}
      <Box
        bg="#d6e1f2"
        m={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={withImage ? '166px' : '150px'}
        height={withImage ? '154px' : '45px'}
        borderRadius="8px"
        style={globalStyles.cursorPointer}
        onClick={onAddChoice}>
        <PlusOutlined />
      </Box>
    </Box>
  )
}

ChoiceForm.propTypes = {}

export default ChoiceForm
