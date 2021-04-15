import { Col, Container, Row, Box } from '@qonsoll/react-design'
import 'antd/dist/antd.css'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea
} from 'components'
import QuestionsList from 'app/domains/Question/components/QuestionsList'

const App = (props) => {
  return (
    <Box bg="#f6f9fe" display="flex" height="inherit">
      <PageLayout>
        <FormContentArea leftSideMenu={<QuestionLayoutSwitcher />}>
          <QuestionsList />
          {/* Here should be QuestionForm  */}
        </FormContentArea>
      </PageLayout>

      <EditorSidebar />
    </Box>
  )
}

export default App
