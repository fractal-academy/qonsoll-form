import 'antd/dist/antd.css'
import { Container } from '@qonsoll/react-design'
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
    <Container>
      <Badge />
      <SubmitButton />
      <ChoiceButton choices={choices} />
      <YesnoButton />
      <RangeButton from={5} to={50} />
    </Container>
  )
}

export default App
