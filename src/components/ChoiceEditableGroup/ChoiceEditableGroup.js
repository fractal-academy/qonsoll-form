import React from 'react'
import PropTypes from 'prop-types'
import { globalStyles } from '../../../styles'
import { ChoiceEditable } from '../../components'
import { Box } from '@qonsoll/react-design'
import { PlusOutlined } from '@ant-design/icons'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'
import { NewButton, styles } from './ChoiceEditableGroup.styles'

function ChoiceEditableGroup(props) {
  const { withImage } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion.questionConfigurations || []

  // [CLEAN FUNCTIONS]
  const onAddChoice = () => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        questionConfigurations: choiceProps
          ? [...choiceProps, { name: '', image: '' }]
          : [{ name: '', image: '' }]
      }
    })
  }

  return (
    <Box {...styles.mainBox} flexDirection={withImage ? 'row' : 'column'}>
      {choiceProps.map((item, index) => (
        <ChoiceEditable
          key={index}
          data={item}
          index={index}
          withImage={withImage}
        />
      ))}
      <NewButton
        height={withImage ? '146px' : '38px'}
        width={withImage ? '166px' : '150px'}
        style={globalStyles.cursorPointer}
        m={1}
        onClick={onAddChoice}>
        <PlusOutlined />
      </NewButton>
    </Box>
  )
}

ChoiceEditableGroup.propTypes = {
  withImage: PropTypes.bool
}

export default ChoiceEditableGroup
