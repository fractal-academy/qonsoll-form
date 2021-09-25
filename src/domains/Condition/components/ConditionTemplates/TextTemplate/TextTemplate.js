import React from 'react'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import MatchCondition from './MatchCondition'
import { Container } from '@qonsoll/react-design'
import { useTranslation } from '../../../../../context/Translation'
import { CustomButton } from '../ConditionTemplates.styles'

function TextTemplate(props) {
  const {
    id,
    handlesDate,
    addCondition,
    questionList,
    addRedirectQuestion,
    questionConfigurations
  } = props

  // [ADDITIONAL_HOOKS]
  const { conditionModalAddCondition } = useTranslation()

  // [CLEAN FUNCTIONS]
  const onClick = () => {
    addCondition({
      answerOption: '',
      redirectQuestion: '',
      answerOptionId: uuid(),
      redirectConditionRule: ''
    })
  }

  return (
    <Container>
      {questionConfigurations?.map((item, index) => (
        <MatchCondition
          item={item}
          key={index}
          index={index}
          questionId={id}
          handlesDate={handlesDate}
          questionList={questionList}
          addRedirectQuestion={addRedirectQuestion}
          questionConfigurations={questionConfigurations}
        />
      ))}
      <CustomButton onClick={onClick} onMouseDown={(e) => e.preventDefault()}>
        {conditionModalAddCondition || '+ Add condition'}
      </CustomButton>
    </Container>
  )
}

TextTemplate.propTypes = {
  id: PropTypes.string,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func,
  questionConfigurations: PropTypes.array
}

export default TextTemplate
