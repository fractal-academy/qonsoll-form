import { Col, Container, Row, Box } from '@qonsoll/react-design'
import 'antd/dist/antd.css'
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
          <Container>
            <Badge />
            <SubmitButton />
            <ChoiceButton choices={choices} />
            <YesnoButton />
            <RangeButton from={5} to={50} />
          </Container>
          {/* Here should be QuestionForm  */}
        </FormContentArea>
      </PageLayout>

      <EditorSidebar />
    </Box>
  )
}

export default App
