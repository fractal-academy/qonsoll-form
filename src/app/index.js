import { Col, Container, Row, Box } from '@qonsoll/react-design'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea
} from 'components'

const App = (props) => {
  return (
    <Box bg="#f6f9fe" display="flex" height="inherit">
      <PageLayout>
        <FormContentArea leftSideMenu={<QuestionLayoutSwitcher />}>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
          <Box>Content </Box>
        </FormContentArea>
      </PageLayout>

      <EditorSidebar />
    </Box>
  )
}

export default App
