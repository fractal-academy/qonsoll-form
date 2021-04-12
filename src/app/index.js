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
    <Box bg="#f6f9fe" display="flex" flex={1} height="inherit">
      <PageLayout>
        <FormContentArea leftSideMenu={<QuestionLayoutSwitcher />}>
          <Box padding={3}>
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
          </Box>
        </FormContentArea>
      </PageLayout>
      <Box display="flex">
        <EditorSidebar />
      </Box>
    </Box>
  )
}

export default App
