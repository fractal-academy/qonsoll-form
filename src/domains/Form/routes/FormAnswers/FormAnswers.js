import { message } from 'antd'
import useMedia from 'use-media'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PageHeader } from '../../../../components'
import { COLLECTIONS } from '../../../../constants'
import useFunctions from '../../../../hooks/useFunctions'
import { Container, Title, NoData } from '@qonsoll/react-design'
import { ResponseTable, ResponseList } from '../../../Response/components'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import { SidebarBoxWrapper } from '../../../../components/Layout/EditorSidebar/EditorSidebar.styles'
import {
  TranslationContext,
  useTranslation
} from '../../../../context/Translation'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'

function FormAnswers(props) {
  const {
    id,
    firebase,
    translations,
    configurations,
    showHeader,
    wrapperPaddings,
    actions = {}
  } = props

  // [COMPONENT STATE HOOKS]
  const [userAnswers, setUserAnswers] = useState([])
  const [userAnswersLoading, setUserAnswersLoading] = useState(false)

  // [CUSTOM HOOKS]
  const { getCollectionRef } = useFunctions(firebase)

  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const { answerEmptyList, answerTitle, answerUserListTitle } = useTranslation()
  const [userAnswerGroup, userAnswerGroupLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.USER_ANSWERS_GROUP).where('formId', '==', id)
  )
  const [formData] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const smallScreen = useMedia({ minWidth: '769px' })

  // [COMPUTED PROPERTIES]
  const containerPadding =
    wrapperPaddings !== undefined ? wrapperPaddings : smallScreen ? 4 : 2

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
        <TranslationContext.Provider value={translations || {}}>
          <TypeformConfigurationContext.Provider value={configurations}>
            <Container display="flex" height="inherit">
              <SidebarBoxWrapper>
                <Title
                  ml={3}
                  my={3}
                  level={5}
                  color="var(--qf-typography-title-color)">
                  {answerUserListTitle || 'Users'}
                </Title>
                {checkUserAswerGroup ? (
                  <ResponseList
                    userAnswerGroup={userAnswerGroup}
                    loading={userAnswerGroupLoading}
                    onListItemClick={onListItemClick}
                  />
                ) : (
                  <NoData
                    description={answerEmptyList || "There's no responses yet"}
                  />
                )}
              </SidebarBoxWrapper>
              <Container p={containerPadding}>
                {showHeader && (
                  <PageHeader
                    onBack={() => history.goBack()}
                    title={answerTitle || 'Answers'}
                  />
                )}

                <ResponseTable
                  isFormQuiz={formData?.isQuiz}
                  data={userAnswers}
                  loading={userAnswersLoading}
                />
              </Container>
            </Container>
          </TypeformConfigurationContext.Provider>
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormAnswers.propTypes = {}

export default FormAnswers
