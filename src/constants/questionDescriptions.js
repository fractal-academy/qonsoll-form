const QUESTION_DESCRIPTIONS = {
  WELCOME_SCREEN: 'Invite your audience in',
  SHORT_TEXT: 'For short answers, like names',
  LONG_TEXT: 'More space to spill the beans',
  STATEMENT: 'Take the mic for a moment',
  PICTURE_CHOICE: 'Multiple choice but prettier',
  CHOICE: 'Multiple choice',
  RATING: 'Rate us',
  YES_NO: 'Just 2 options, yes or no',
  OPINION_SCALE: 'A customizable, numbered scale',
  DATE: 'Collect answers in date format',
  FILE_UPLOAD: 'Upload a file up to 10MB',
  VIDEO_ANSWER: 'Answer question via video',
  ENDING: 'Ending'
}

const QUESTION_TYPE_KEYS = Object.keys(QUESTION_DESCRIPTIONS)
const QUESTION_TYPE_VALUES = Object.values(QUESTION_DESCRIPTIONS)

export default QUESTION_DESCRIPTIONS
export { QUESTION_TYPE_KEYS, QUESTION_TYPE_VALUES }
