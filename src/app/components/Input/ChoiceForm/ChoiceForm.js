import React, { useEffect, useState } from 'react'
import { Box } from '@qonsoll/react-design'
import { ChoiceInput } from 'components'
import { PlusOutlined } from '@ant-design/icons'
import { globalStyles } from 'app/styles'
import {
  DISPATCH_EVENTS,
  useFormContext,
  useFormContextDispatch
} from 'app/context/FormContext'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function ChoiceForm(props) {
  const { withImage } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const currentQuestion = useFormContext()
  const dispatch = useFormContextDispatch()

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion.btnProps || []
  // [CLEAN FUNCTIONS]
  const onAddChoice = () => {
    dispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        btnProps: choiceProps
          ? [...choiceProps, { name: '', image: '' }]
          : [{ name: '', image: '' }]
      }
    })
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

  return (
    <Box
      display="flex"
      flexDirection={withImage ? 'row' : 'column'}
      flexWrap="wrap">
      {choiceProps?.map((item, index) => (
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

ChoiceForm.propTypes = {
  withImage: PropTypes.bool
}

export default ChoiceForm
