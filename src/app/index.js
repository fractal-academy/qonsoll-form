import { Col, Container, Row, Box } from '@qonsoll/react-design'
import 'antd/dist/antd.css'
import FormAdvancedView from 'app/domains/Form/components/FormAdvancedView'

const contentStyle = {
  height: '150px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#0445af'
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
    <FormAdvancedView>
      <InnerComponent1 />
      <InnerComponent2 />
      <InnerComponent3 />
      <InnerComponent4 />
    </FormAdvancedView>
  )
}

export default App
