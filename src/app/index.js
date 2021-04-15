import { Col, Container, Row, Box } from '@qonsoll/react-design'
import 'antd/dist/antd.css'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea
} from 'components'
import FormConditionsForm from 'domains/Form/components/FormConditionsForm'
import { QuestionForm } from 'domains/Question/components'

const App = (props) => {
  return <QuestionForm />
}

export default App
