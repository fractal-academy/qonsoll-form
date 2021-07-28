import moment from 'moment'
import { DATE_CONDITION_RULES } from '../../../constants'

const dateAnswerConditionComparison = (condition, date, fieldValue) => {
  //formating date to timestamp
  const formatedDate = moment(date).format('x')
  const formatedFieldValue = moment(fieldValue).format('x')

  const conditionOnOperation = {
    [DATE_CONDITION_RULES.IS_AFTER]: formatedFieldValue > formatedDate,
    [DATE_CONDITION_RULES.IS_AFTER_OR_ON]: formatedFieldValue >= formatedDate,
    [DATE_CONDITION_RULES.IS_BEFORE]: formatedFieldValue < formatedDate,
    [DATE_CONDITION_RULES.IS_BEFORE_OR_ON]: formatedFieldValue <= formatedDate,
    // eslint-disable-next-line
    [DATE_CONDITION_RULES.IS_NOT_ON]: formatedFieldValue !== formatedDate,
    [DATE_CONDITION_RULES.IS_ON]: formatedFieldValue === formatedDate
  }
  return conditionOnOperation[condition]
}

export default dateAnswerConditionComparison
