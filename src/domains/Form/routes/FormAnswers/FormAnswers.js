import { Box, Container, NoData, Title } from '@qonsoll/react-design'
import React, { useState } from 'react'
import { ResponseList, ResponseTable } from '../../../Response/components'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'

import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import { COLLECTIONS } from '../../../../constants'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import { PageHeader } from '../../../../components'
import SidebarBoxWrapper from '../../../../components/Layout/EditorSidebar/EditorSidebar.styles'
import { message } from 'antd'
import useFunctions from '../../../../hooks/useFunctions'
import { useHistory } from 'react-router-dom'
import { useTranslations } from '@qonsoll/translation'

function FormAnswers(props) {
  const { id, firebase, showHeader, wrapperPaddings, actions = {} } = props

  // [COMPONENT STATE HOOKS]
  const [userAnswers, setUserAnswers] = useState([])
  const [userAnswersLoading, setUserAnswersLoading] = useState(false)
  const [isDrawerOpened, setDraverOpened] = useState(false)

  // [CUSTOM HOOKS]
  const { getCollectionRef } = useFunctions(firebase)

  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const { t } = useTranslations()
  const [userAnswerGroup, userAnswerGroupLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.USER_ANSWERS_GROUP).where('formId', '==', id)
  )
  const [formData] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const smallScreen = window.innerWidth >= 768

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
      message.error('Error occurred during user answers loading')
    }
    setUserAnswersLoading(false)
  }
  const checkUserAswerGroup = userAnswerGroup?.length > 0

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <Container display="flex" height="inherit">
          <Container p={containerPadding}>
            {showHeader && (
              <PageHeader
                isDrawerOpened={isDrawerOpened}
                setDraverOpened={setDraverOpened}
                onBack={() => history.goBack()}
                title={t('Answers')}
              />
            )}

            <ResponseTable
              isFormQuiz={formData?.isQuiz}
              data={userAnswers}
              loading={userAnswersLoading}
            />
          </Container>
          <SidebarBoxWrapper
            // isDrawerVisible={true}
            setDraverVisible={setDraverOpened}>
            <Title
              ml={3}
              my={3}
              level={5}
              color="var(--qf-typography-title-color)">
              {t('Users')}
            </Title>
            {checkUserAswerGroup ? (
              <Box overflow="auto">
                <ResponseList
                  userAnswerGroup={userAnswerGroup}
                  loading={userAnswerGroupLoading}
                  onListItemClick={onListItemClick}
                />
              </Box>
            ) : (
              <NoData description={t('There is no responses yet')} />
            )}
          </SidebarBoxWrapper>
        </Container>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormAnswers.propTypes = {}

export default FormAnswers
