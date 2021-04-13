import { Box, Col, Container, Row } from '@qonsoll/react-design'
import 'antd/dist/antd.css'
import { QuestionForm } from 'domains/Question/components'
import {
  EditorSidebar,
  PageEditorWrapper,
  PageHeader,
  Popover
} from 'components'
import { SettingOutlined } from '@ant-design/icons'

const App = (props) => {
  return (
    <Box display="flex" height="inherit" flex={1}>
      <Box display="flex" flexDirection="column" flex={1} maxHeight="100%">
        <Box>
          <PageHeader title="Main page" />
        </Box>
        <PageEditorWrapper>
          <QuestionForm />
        </PageEditorWrapper>
      </Box>
      <Box display="flex">
        <EditorSidebar />
      </Box>
    </Box>
  )
}

export default App
