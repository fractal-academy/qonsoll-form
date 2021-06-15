import 'antd/dist/antd.css'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTES_PATHS } from 'app/constants'
import { FormEdit, FormsAll, FormShow } from 'domains/Form/routes'
import CurrentQuestionContextProvider from 'app/context/CurrentQuestion'
import AnswersContextProvider from 'app/context/Answers/AnswersContext'

const translations = {}

const App = () => {
  return (
    <Switch>
      {/* ALL */}
      <Route exact path={ROUTES_PATHS.FORMS_ALL} key={ROUTES_PATHS.FORMS_ALL}>
        <FormsAll />
      </Route>
      {/* EDIT */}
      <Route exact path={ROUTES_PATHS.FORM_EDIT} key={ROUTES_PATHS.FORM_EDIT}>
        <CurrentQuestionContextProvider>
          <FormEdit />
        </CurrentQuestionContextProvider>
      </Route>
      {/* SHOW */}
      <Route exact path={ROUTES_PATHS.FORM_SHOW} key={ROUTES_PATHS.FORM_SHOW}>
        <AnswersContextProvider>
          <FormShow />
        </AnswersContextProvider>
      </Route>
      <Route render={() => <Redirect to={ROUTES_PATHS.FORMS_ALL} />} />
    </Switch>
  )
}

export default App
