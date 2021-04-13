import { firestore } from 'app/services'
import {
  SubmitButton,
  ChoiceButton,
  YesnoButton,
  RangeButton,
  Badge
} from 'app/components'
import { Container } from '@qonsoll/react-design'

const App = () => {
  // const onClick = () => {
  //   firestore
  //     .collection('test')
  //     .get()
  //     .then((res) => res.docs.forEach((item) => console.log(item.data())))
  // }

  return (
    <Container>
      <Badge />
      <SubmitButton />
      <ChoiceButton />
      <YesnoButton />
      <RangeButton from={5} to={50} />
    </Container>
  )
}

export default App
