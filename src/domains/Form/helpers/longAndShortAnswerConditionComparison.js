import { TEXT_CONDITION_RULES } from '../../../constants'

const longAndShortAnswerConditionComparison = (
  condition,
  answer,
  fieldValue
) => {
  const conditionOnOperation = {
    [TEXT_CONDITION_RULES.IS_EQUAL_TO]: answer === fieldValue,
    [TEXT_CONDITION_RULES.IS_NOT_EQUAL_TO]: answer !== fieldValue,
    [TEXT_CONDITION_RULES.BEGINS_WITH]: answer.startsWith(fieldValue),
    [TEXT_CONDITION_RULES.ENDS_WITH]: answer.endsWith(fieldValue),
    // eslint-disable-next-line
    [TEXT_CONDITION_RULES.ENDS_WITH]: answer.includes(fieldValue),
    [TEXT_CONDITION_RULES.DOES_NOT_CONTAIN]: !answer.includes(fieldValue)
  }
  return conditionOnOperation[condition]
}

export default longAndShortAnswerConditionComparison
