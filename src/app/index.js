import 'antd/dist/antd.css'
import { Typography } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea
} from 'components'
import {
  Badge,
  RangeButton,
  YesnoButton,
  ChoiceButton,
  SubmitButton
} from 'app/components'

const App = (props) => {
  const choices = ['choice1', 'choice2', 'choice3', 'choice4']

  return (
    <Box bg="#f6f9fe" display="flex" height="inherit">
      <PageLayout>
        <FormContentArea leftSideMenu={<QuestionLayoutSwitcher />}>
          <Box>
            <Box mt={4}>
              <Typography.Title level={3}>1. Custom badge</Typography.Title>
            </Box>
            <Badge />
            <Box mt={4}>
              <Typography.Title level={3}>2.Submit button</Typography.Title>
            </Box>
            <SubmitButton />
            <Box mt={4}>
              <Typography.Title level={3}>3. Choice button</Typography.Title>
            </Box>
            <ChoiceButton choices={choices} />
            <Box mt={4}>
              <Typography.Title level={3}>4. Yes-no button</Typography.Title>
            </Box>
            <YesnoButton />
            <Box mt={4}>
              <Typography.Title level={3}>5. Range button</Typography.Title>
            </Box>
            <RangeButton from={1} to={10} />
          </Box>
          {/* Here should be QuestionForm  */}
        </FormContentArea>
      </PageLayout>

      <EditorSidebar />
    </Box>
  )
}

export default App
