import 'antd/dist/antd.css'
import { Box } from '@qonsoll/react-design'
import { Carousel } from 'app/components'

const InnerComponent1 = () => {
  return <Box>InnerComponent1</Box>
}
const InnerComponent2 = () => {
  return <Box>InnerComponent2</Box>
}
const InnerComponent3 = () => {
  return <Box>InnerComponent3</Box>
}
const InnerComponent4 = () => {
  return <Box>InnerComponent4</Box>
}

const App = (props) => {
  return <Carousel />
}

export default App
