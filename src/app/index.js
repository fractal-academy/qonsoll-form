import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTES_PATHS, ROUTES_VALUES } from 'app/constants'
import 'antd/dist/antd.css'
import { ChoiceButton, YesnoButton } from 'app/components'
import { Box } from '@qonsoll/react-design'
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
    <Switch>
      {ROUTES_VALUES.map((route) => (
        <Route exact key={route.path} {...route} />
      ))}
      <Route render={() => <Redirect to={ROUTES_PATHS.FORMS_ALL} />} />
    </Switch>
  )
}

export default App
