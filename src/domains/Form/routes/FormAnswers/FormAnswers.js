import { message } from 'antd'
import useMedia from 'use-media'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import { PageHeader } from '../../../../components'
import { COLLECTIONS } from '../../../../constants'
import useFunctions from '../../../../hooks/useFunctions'
import { Container, Row, Col, Box, Text } from '@qonsoll/react-design'
import { ResponseTable, ResponseList } from '../../../Response/components'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import { EmptyState } from '../../../../../src/domains/Form/components/FormConditionsForm/FormConditionsForm.styles'
import {
  TranslationContext,
  useTranslation
} from '../../../../context/Translation'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'

function FormAnswers(props) {
  const { id, firebase, translate, configurations, actions = {} } = props

  // [COMPONENT STATE HOOKS]
  const [userAnswers, setUserAnswers] = useState([])
  const [userAnswersLoading, setUserAnswersLoading] = useState(false)

  // [CUSTOM HOOKS]
  const { getCollectionRef } = useFunctions(firebase)

  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const { emptyStateDescription } = useTranslation()
  const [userAnswerGroup, userAnswerGroupLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.USER_ANSWERS_GROUP).where('formId', '==', id)
  )
  const [formData] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const smallScreen = useMedia({ minWidth: '769px' })
  const handleSmallScreen = useMedia({ minWidth: '900px' })
  const { smallScreenHandleWarning } = useTranslation()

  // [COMPUTED PROPERTIES]
  const containerPadding = smallScreen ? 4 : 2

  // [CLEAN FUNCTIONS]
  const onListItemClick = async (user, date) => {
    try {
      setUserAnswersLoading(true)
      const answers = await getCollectionRef(COLLECTIONS.ANSWERS)
        .where('user', '==', user)
        .where('date', '==', date)
        .where('formId', '==', id)
        .get()
      const answersData = answers?.docs?.map((item, index) => {
        const answerCheck =
          item?.data()?.questionType === 'File upload'
            ? Object.values(item?.data()?.answer)
                .map((uploadItem) => uploadItem.name)
                .toString()
            : item?.data()?.answer

        return {
          key: index,
          questionTitle: item?.data()?.questionTitle,
          answer: answerCheck,
          answerScore: item?.data()?.answerScore,
          order: item?.data()?.order
        }
      })
      setUserAnswers(answersData.sort((a, b) => a.order - b.order))
    } catch (e) {
      console.log(e)
      message.error('Error occurred during user answers loading')
    }
    setUserAnswersLoading(false)
  }
  const checkUserAswerGroup = userAnswerGroup?.length > 0

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={{ t: translate }}>
          <TypeformConfigurationContext.Provider value={configurations}>
            <Container p={containerPadding}>
              <PageHeader onBack={() => history.goBack()} title="Answers" />
              {handleSmallScreen ? (
                checkUserAswerGroup ? (
                  <Row noGutters height="inherit" my={3}>
                    <Col height="inherit" cw="auto" ml={3}>
                      <ResponseList
                        userAnswerGroup={userAnswerGroup}
                        loading={userAnswerGroupLoading}
                        onListItemClick={onListItemClick}
                      />
                    </Col>
                    <Col height="inherit" overflowY="scroll">
                      <ResponseTable
                        isFormQuiz={formData?.isQuiz}
                        data={userAnswers}
                        loading={userAnswersLoading}
                      />
                    </Col>
                  </Row>
                ) : (
                  <EmptyState
                    description={
                      emptyStateDescription ||
                      "This form doesn't have any responses yet"
                    }
                  />
                )
              ) : (
                <Box
                  width="100%"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <Text>
                    {smallScreenHandleWarning ||
                      'This feature is available only on desktop.'}
                  </Text>
                </Box>
              )}
            </Container>
          </TypeformConfigurationContext.Provider>
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormAnswers.propTypes = {}

export default FormAnswers
