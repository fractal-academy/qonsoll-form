import { Button } from 'app/components'
import { Box } from '@qonsoll/react-design'

const RangeButton = (props) => {
  const { from = 0, to = 0 } = props

  const onButtonClick = () => {}

  const range = Array(to - from + 1)
    .fill(0)
    .map((el, index) => from + index)

  return (
    <Box display="flex">
      {range.map((item) => (
        <Button key={item} buttonType="secondary" onClick={onButtonClick}>
          {item}
        </Button>
      ))}
    </Box>
  )
}

export default RangeButton
