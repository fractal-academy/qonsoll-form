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

const App = (props) => {
  return (
    <Box bg="#f6f9fe" display="flex" height="inherit">
      {/*<PageLayout>*/}
      {/*  <FormContentArea leftSideMenu={<QuestionLayoutSwitcher />}>*/}
      {/* Here should be QuestionForm  */}
      <ConditionForm />
      {/*<QuestionForm />*/}
      {/*</FormContentArea>*/}
      {/*</PageLayout>*/}

      {/*<EditorSidebar />*/}
    </Box>
  )
}

export default App
