const ANSWER_TYPE = {
  SUBMIT: 'Submit',
  PLAIN_TEXT_STRING: 'Input',
  PLAIN_TEXT_DATE: 'Input',
  CHOICE: 'Choice',
  FILE: 'File'
}

const ANSWER_TYPE_KEYS = Object.keys(ANSWER_TYPE)
const ANSWER_TYPE_VALUE = Object.values(ANSWER_TYPE)

export default ANSWER_TYPE
export { ANSWER_TYPE_KEYS, ANSWER_TYPE_VALUE }
