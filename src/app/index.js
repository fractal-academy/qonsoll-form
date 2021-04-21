import 'antd/dist/antd.css'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTES_PATHS, ROUTES_VALUES } from 'app/constants'

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
