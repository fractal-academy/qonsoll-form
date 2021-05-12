import 'antd/dist/antd.css'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTES_PATHS, ROUTES, ROUTES_VALUES } from 'app/constants'
import { FormEdit } from 'domains/Form/routes'
import CurrentQuestionContextProvider from 'app/context/CurrentQuestion'

const App = (props) => {
  return (
    <Switch>
      {ROUTES_VALUES.map((route) => {
        if (route.path === ROUTES.FORM_EDIT.path)
          return (
            <Route exact path={ROUTES_PATHS.FORM_EDIT} key={route}>
              <CurrentQuestionContextProvider>
                <FormEdit />
              </CurrentQuestionContextProvider>
            </Route>
          )
        return <Route exact key={route.path} {...route} />
      })}

      <Route render={() => <Redirect to={ROUTES_PATHS.FORMS_ALL} />} />
    </Switch>
  )
}

export default App
