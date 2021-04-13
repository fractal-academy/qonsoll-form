import { firestore } from 'app/services'
import {
  Badge,
  RangeButton,
  YesnoButton,
  ChoiceButton,
  SubmitButton
} from 'app/components'
import { Container } from '@qonsoll/react-design'

const App = () => {
  // const onClick = () => {
  //   firestore
  //     .collection('test')
  //     .get()
  //     .then((res) => res.docs.forEach((item) => console.log(item.data())))
  // }

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
