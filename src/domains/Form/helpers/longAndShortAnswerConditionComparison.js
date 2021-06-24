import { TEXT_CONDITION_RULES_KEYS } from '~/app/constants/planeTextStringConditionRules'

const longAndShortAnswerConditionComparison = (
  condition,
  answer,
  fieldValue
) => {
  const conditionOnOperation = {
    'is equal to': answer === fieldValue,
    'is not equal to': answer !== fieldValue,
    'begins with': answer.startsWith(fieldValue),
    'ends with': answer.endsWith(fieldValue),
    // eslint-disable-next-line
    'contains': answer.includes(fieldValue),
    'does not contain': !answer.includes(fieldValue)
  }
  return conditionOnOperation[condition]
}

export default longAndShortAnswerConditionComparison
