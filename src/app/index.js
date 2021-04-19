import { Col, Container, Row, Box } from '@qonsoll/react-design'
import 'antd/dist/antd.css'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea,
  TextAreaForm
} from 'components'
import FormConditionsForm from 'domains/Form/components/FormConditionsForm'
import ModalWithFormConditionsForm from 'domains/Condition/combined/ModalWithFormConditionsForm'
import { FormEdit } from 'domains/Form/routes'
import FormsAll from 'domains/Form/routes/FormsAll'

const App = (props) => {
  return <FormEdit />
  // <FormsAll />
}

export default App
