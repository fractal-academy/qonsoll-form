import Fuse from 'fuse.js'
import useMedia from 'use-media'
import PropTypes from 'prop-types'
import { Typography, message, Input } from 'antd'
import useFunctions from '../../../../hooks/useFunctions'
import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Box, Container } from '@qonsoll/react-design'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'
import { TranslationContext } from '../../../../context/Translation'
import { LAYOUT_TYPE_KEYS } from '../../../../constants/layoutTypes'
import { Spinner, StaticList, PageHeader } from '../../../../components'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'
import FormSimpleFormWithModal from '../../../../domains/Form/components/FormSimpleFormWithModal'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'

const { Text } = Typography

function FormsAll(props) {
  const {
    firebase,
    translations,
    actions = {},
    childrenModal,
    titleProps,
    configurations,
    onBack,
    disableAddButton
  } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef, getTimestamp, setData } = useFunctions(firebase)

  // [ADDITIONAL HOOKS]
  const searchRef = useRef()
  const [data] = useCollectionData(
    getCollectionRef(COLLECTIONS.FORMS).orderBy('creationDate', 'desc')
  )
  const mobileLayout = useMedia({ minWidth: '769px' })

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentData, setCurrentData] = useState(data)
  const [edit, setEdit] = useState(false)
  const fuse = new Fuse(data, { keys: ['title'] })

  // [COMPUTED PROPERTIES]
  let amountFiles = currentData?.length
  const { formsAllRouteTitle, formSearchPlaceholder, formsCounterDeclaration } =
    translations || {}
  const containerPadding = mobileLayout ? 4 : 2

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
        title: 'WS.',
        order: 0
      }).catch((e) => message.error(e.message))
      setData(COLLECTIONS.QUESTIONS, endingId, {
        formId: formId,
        id: endingId,
        layoutType: LAYOUT_TYPE_KEYS[0],
        questionType: QUESTION_TYPES.ENDING,
        title: 'Thank you for attention!',
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
        <TranslationContext.Provider value={translations || {}}>
          <TypeformConfigurationContext.Provider value={configurations}>
            <Container p={containerPadding}>
              {/* 'onBack' func. also configures if there'll be back-button */}
              <PageHeader
                onBack={onBack}
                titleProps={titleProps}
                title={formsAllRouteTitle || 'Forms'}
              />
              <Row noGutters mb={3}>
                <Col>
                  <Text>
                    {formsCounterDeclaration || 'Amount of shown forms: '}
                    {amountFiles}
                  </Text>
                </Col>
              </Row>
              {data?.length > 4 && (
                // Search will be wisible only when there's will be more than 4 forms
                <Row noGutters mb={3}>
                  <Col>
                    <Input
                      ref={searchRef}
                      placeholder={`${
                        formSearchPlaceholder || 'Search form by name'
                      }...`}
                      onChange={(input) => searchData(input.target.value)}
                    />
                  </Col>
                </Row>
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
          </TypeformConfigurationContext.Provider>
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormsAll.propTypes = {
  firebase: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  childrenModal: PropTypes.node,
  disableAddButton: PropTypes.bool,
  firstLevelHidden: PropTypes.bool,
  titleText: PropTypes.string,
  actions: PropTypes.shape({
    onFormShow: PropTypes.func,
    onFormItemClick: PropTypes.func
  })
}

export default FormsAll
