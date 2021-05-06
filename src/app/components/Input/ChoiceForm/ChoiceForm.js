import { Box } from '@qonsoll/react-design'
import { ChoiceInput } from 'components'
import { PlusOutlined } from '@ant-design/icons'
import { globalStyles } from 'app/styles'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from 'app/context/CurrentQuestion'
import PropTypes from 'prop-types'

function ChoiceForm(props) {
  const { withImage } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion.btnProps || []

  // [CLEAN FUNCTIONS]
  const onAddChoice = () => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        btnProps: choiceProps
          ? [...choiceProps, { name: '', image: '' }]
          : [{ name: '', image: '' }]
      }
    })
  }

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
