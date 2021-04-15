import { Col, Container, Row, Box } from '@qonsoll/react-design'
import 'antd/dist/antd.css'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea
} from 'components'
import FormConditionsForm from 'domains/Form/components/FormConditionsForm'

const App = (props) => {
  return <FormConditionsForm />
}

export default App
