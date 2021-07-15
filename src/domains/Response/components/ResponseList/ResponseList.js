import React, { useState } from 'react'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import { TranslationContext } from '../../../../context/Translation'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import useFunctions from '../../../../hooks/useFunctions'
import { COLLECTIONS } from '../../../../constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Row, Col } from '@qonsoll/react-design'
import { ResponseTable, ResponseList } from '../../../Response/components'
import { message } from 'antd'

function FormAnswers(props) {
  const { actions = {}, id, translate, firebase, configurations } = props

  // [COMPONENT STATE HOOKS]
  const [userAnswers, setUserAnswers] = useState([])
  const [userAnswersLoading, setUserAnswersLoading] = useState(false)
  // [CUSTOM HOOKS]
  const { getCollectionRef } = useFunctions(firebase)

  // [ADDITIONAL HOOKS]
  const [userAnswerGroup, userAnswerGroupLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.USER_ANSWERS_GROUP).where('formId', '==', id)
  )

  // [CLEAN FUNCTIONS]
  const onListItemClick = async (user, date) => {
    try {
      setUserAnswersLoading(true)
      const answers = await getCollectionRef(COLLECTIONS.ANSWERS)
        .where('user', '==', user)
        .where('date', '==', date)
        .where('formId', '==', id)
        .get()
      const answersData = answers?.docs?.map((item, index) => ({
        key: index,
        questionTitle: item?.data()?.questionTitle,
        answer: item?.data()?.answer
      }))
      setUserAnswers(answersData)
    } catch (e) {
      console.log(e)
      message.error('Error occurred during user answers loading')
    }
    setUserAnswersLoading(false)
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={{ t: translate }}>
          <TypeformConfigurationContext.Provider value={configurations}>
            <Row noGutters height="inherit">
              <Col height="inherit">
                <ResponseList
                  userAnswerGroup={userAnswerGroup}
                  loading={userAnswerGroupLoading}
                  onListItemClick={onListItemClick}
                />
              </Col>
              <Col height="inherit">
                <ResponseTable
                  data={userAnswers}
                  loading={userAnswersLoading}
                />
              </Col>
            </Row>
          </TypeformConfigurationContext.Provider>
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}
FormAnswers.propTypes = {}
export default FormAnswers
