import { useState } from 'react'
import { ChoiceInput } from 'components'
import { globalStyles } from 'app/styles'
import { Box } from '@qonsoll/react-design'
import { PlusOutlined } from '@ant-design/icons'

let startLetter = 65

function ChoiceForm(props) {
  const { withImage } = props

  // [COMPONENT STATE HOOKS]
  const [choices, setChoices] = useState([])

  // [CLEAN FUNCTIONS]
  const onAddChoice = () => {
    setChoices((prev) => [...prev, { value: '', keyLetter: startLetter++ }])
  }

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
