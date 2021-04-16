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

const App = (props) => {
  return (
    <ModalWithFormConditionsForm>
      <FormConditionsForm />
    </ModalWithFormConditionsForm>
  )
}

export default App
