import { Button, Container } from '@qonsoll/react-design'

import MatchCondition from './MatchCondition'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslations } from '@qonsoll/translation'
import { v4 as uuid } from 'uuid'

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
  const { t } = useTranslations()

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
      <Button onClick={onClick} onMouseDown={(e) => e.preventDefault()}>
        {t('+ Add condition')}
      </Button>
    </Container>
  )
}

TextTemplate.propTypes = {
  id: PropTypes.string,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func,
  questionConfigurations: PropTypes.array,
  handlesDate: PropTypes.bool
}

export default TextTemplate
