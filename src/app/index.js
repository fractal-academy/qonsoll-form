import { Col, Container, Row, Box } from '@qonsoll/react-design'
import 'antd/dist/antd.css'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea
} from 'components'
import FormsAll from './domains/Form/routes/FormsAll'

const App = (props) => {
  return (
    // <Box bg="#f6f9fe" display="flex" height="inherit">
    //   <PageLayout>
    //     <FormContentArea leftSideMenu={<QuestionLayoutSwitcher />}>
    //       {/* Here should be QuestionForm  */}
    //     </FormContentArea>
    //   </PageLayout>

    //   <EditorSidebar />
    // </Box>
    <FormsAll />
  )
}

export default App
