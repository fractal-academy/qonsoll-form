import 'antd/dist/antd.css'
import { Box } from '@qonsoll/react-design'
import { Carousel } from 'app/components'

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}

const InnerComponent1 = () => {
  return <Box style={contentStyle}>InnerComponent 1</Box>
}
const InnerComponent2 = () => {
  return <Box style={contentStyle}>InnerComponent 2</Box>
}
const InnerComponent3 = () => {
  return <Box style={contentStyle}>InnerComponent 3</Box>
}
const InnerComponent4 = () => {
  return <Box style={contentStyle}>InnerComponent 4</Box>
}

const App = (props) => {
  return (
    <Carousel>
      <InnerComponent1 />
      <InnerComponent2 />
      <InnerComponent3 />
      <InnerComponent4 />
    </Carousel>
  )
}

export default App
