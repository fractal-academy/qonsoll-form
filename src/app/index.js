import { Col, Container, Row, Box } from '@qonsoll/react-design'
import 'antd/dist/antd.css'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea
} from 'components'
import { QuestionForm } from 'domains/Question/components'
import { ConditionForm } from 'domains/Condition/components'
import FormConditionsForm from 'domains/Form/components/FormConditionsForm'

const App = (props) => {
  return (
    <Box bg="#f6f9fe" display="flex" height="inherit">
      <PageLayout>
        <FormContentArea leftSideMenu={<QuestionLayoutSwitcher />}>
          Here should be QuestionForm
          <FormConditionsForm />
          {/*<QuestionForm />*/}
        </FormContentArea>
      </PageLayout>

      <EditorSidebar />
    </Box>
  )
}

export default App
