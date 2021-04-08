const QUESTION_TYPE = {
  WELCOME_SCREEN: 'Welcome screen',
  SHORT_TEXT: 'Short text',
  LONG_TEXT: 'Long text',
  STATEMENT: 'Statement',
  PICTURE_CHOICE: 'Picture choice',
  RATING: 'Rating',
  YES_NO: 'Yes/No',
  OPINION_SCALE: 'Opinion scale',
  DATE: 'Date',
  FILE_UPLOAD: 'File upload'
}

const QUESTION_TYPE_KEYS = Object.keys(QUESTION_TYPE)
const QUESTION_TYPE_VALUE = Object.values(QUESTION_TYPE)

export { QUESTION_TYPE, QUESTION_TYPE_KEYS, QUESTION_TYPE_VALUE }
