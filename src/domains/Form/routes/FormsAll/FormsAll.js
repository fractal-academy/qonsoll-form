import { Box, Container, Text } from '@qonsoll/react-design'
import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'
import { Input, message } from 'antd'
import { PageHeader, Spinner, StaticList } from '../../../../components'
import React, { useEffect, useRef, useState } from 'react'

import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import FormSimpleFormWithModal from '../../../../domains/Form/components/FormSimpleFormWithModal'
import Fuse from 'fuse.js'
import { LAYOUT_TYPE_KEYS } from '../../../../constants/layoutTypes'
import PropTypes from 'prop-types'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import useFunctions from '../../../../hooks/useFunctions'
import { useTranslations } from '@qonsoll/translation'

function FormsAll(props) {
  const {
    firebase,
    actions = {},
    childrenModal,
    showHeader,
    disableAddButton,
    wrapperPaddings
  } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef, getTimestamp, setData } = useFunctions(firebase)

  // [ADDITIONAL HOOKS]
  const searchRef = useRef()

  const [data] = useCollectionData(
    getCollectionRef(COLLECTIONS.FORMS).orderBy('creationDate', 'desc')
  )

  const smallScreen = window.innerWidth >= 768

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentData, setCurrentData] = useState(data)
  const [edit, setEdit] = useState(false)
  const fuse = new Fuse(data, { keys: ['title'] })

  // [COMPUTED PROPERTIES]
  let amountFiles = currentData?.length
  const { t } = useTranslations()
  const containerPadding =
    wrapperPaddings !== undefined ? wrapperPaddings : smallScreen ? 4 : 2

  // [USE_EFFECTS]
  useEffect(() => {
    setCurrentData(data)
  }, [data])

  // [CLEAN FUNCTIONS]
  const searchData = () => {
    if (searchRef.current.input.value) {
      const searchRes = fuse.search(searchRef.current.input.value)
      setCurrentData(searchRes?.map((item) => item.item))
    } else setCurrentData(data)
  }

  const onFormCreate = async (data) => {
    const { title, subtitle, isQuiz, ...restData } = data
    const formId = getCollectionRef(COLLECTIONS.FORMS).doc().id
    const formData = {
      ...restData,
      title,
      subtitle,
      id: formId,
      isQuiz: !!isQuiz,
      creationDate: getTimestamp().now()
    }
    await setData(COLLECTIONS.FORMS, formId, formData).catch((e) =>
      message.error(e.message)
    )
    if (!edit) {
      //generate default question id and default ending id
      const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
      const endingId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
      //add default question and ending to database
      setData(COLLECTIONS.QUESTIONS, questionId, {
        formId: formId,
        id: questionId,
        layoutType: LAYOUT_TYPE_KEYS[0],
        questionType: QUESTION_TYPES.WELCOME_SCREEN,
        title: t('Welcome screen'),
        order: 0
      }).catch((e) => message.error(e.message))
      setData(COLLECTIONS.QUESTIONS, endingId, {
        formId: formId,
        id: endingId,
        layoutType: LAYOUT_TYPE_KEYS[0],
        questionType: QUESTION_TYPES.ENDING,
        title: t('Thank you for attention!'),
        order: 1
      }).catch((e) => message.error(e.message))
    }
  }
  const showModal = () => {
    setIsModalVisible(true)
  }
  if (!data) {
    return <Spinner />
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <Container p={containerPadding}>
          {showHeader && (
            <>
              <PageHeader title={t('Forms')} />
              <Box mb={3}>
                <Text color="var(--qf-typography-caption-color)">
                  {`${t('Amount of forms')}: `}
                  {amountFiles}
                </Text>
              </Box>
            </>
          )}

          {data?.length > 4 && (
            // Search will be visible only when there's will be more than 4 forms
            <Box mb={3}>
              <Input
                ref={searchRef}
                placeholder={`${t('Search form by name')}...`}
                onChange={(input) => searchData(input.target.value)}
              />
            </Box>
          )}
          <Box mr="-10px" className="custom-scroll">
            <StaticList
              setEdit={setEdit}
              data={currentData}
              onClick={showModal}
              disableAddButton={!disableAddButton}
            />

            <FormSimpleFormWithModal
              onModalSubmit={onFormCreate}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}>
              {childrenModal}
            </FormSimpleFormWithModal>
          </Box>
        </Container>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormsAll.propTypes = {
  firebase: PropTypes.object.isRequired,
  translations: PropTypes.func,
  onBack: PropTypes.func,
  titleProps: PropTypes.object,
  childrenModal: PropTypes.node,
  configurations: PropTypes.object,
  disableAddButton: PropTypes.bool,
  actions: PropTypes.shape({
    onFormShow: PropTypes.func,
    onFormItemClick: PropTypes.func
  })
}

export default FormsAll
