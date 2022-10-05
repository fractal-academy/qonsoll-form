const getQuestionAnswerFromContext = (answersContext, question) => {
  const filteredAnswers = Object.values(answersContext)?.filter(
    (item) => item?.question?.id === question?.id
  )?.[0]
  if (filteredAnswers) return filteredAnswers
}

export default getQuestionAnswerFromContext
