import Fuse from 'fuse.js'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import {
  Breadcrumb,
  Typography,
  message,
  Divider,
  Button,
  Menu,
  Input
} from 'antd'
import useMedia from 'use-media'
import { globalStyles } from '../../../../../styles'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'
import { styles } from './FormsAll.styles'
import { Spinner, StaticList } from '../../../../components'
import { LAYOUT_TYPE_KEYS } from '../../../../constants/layoutTypes'
import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ArrowLeftOutlined, FolderOutlined } from '@ant-design/icons'
import FormSimpleFormWithModal from '../../../../domains/Form/components/FormSimpleFormWithModal'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import { TranslationContext } from '../../../../context/Translation'
import useFunctions from '../../../../hooks/useFunctions'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'

const { Title, Text } = Typography

const mockRoutes = [
  { path: '/forms', page: 'Forms' },
  { path: '/images', page: 'Images' },
  { path: '/videos', page: 'Videos' }
]
function FormsAll(props) {
  const {
    firebase,
    translate,
    actions = {},
    childrenModal,
    disableAddButton,
    titleText,
    firstLevelHidden,
    configurations
  } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef, getTimestamp, setData } = useFunctions(firebase)
  // [ADDITIONAL HOOKS]
  const searchRef = useRef()
  // const history = useHistory()
  const [data] = useCollectionData(
    getCollectionRef(COLLECTIONS.FORMS).orderBy('creationDate', 'desc')
  )
  const mobileLayout = useMedia({ minWidth: '769px' })
  // const squareDesctopLayout = useMedia({ minWidth: '1024px' })
  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentData, setCurrentData] = useState(data)
  const [edit, setEdit] = useState(false)
  const fuse = new Fuse(data, { keys: ['title'] })

  // [COMPUTED PROPERTIES]
  let amountFiles = data?.length
  const formId = getCollectionRef(COLLECTIONS.FORMS).doc().id
  const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id

  // [CLEAN FUNCTIONS]
  const searchData = () => {
    if (searchRef.current.input.value) {
      const searchRes = fuse.search(searchRef.current.input.value)
      setCurrentData(searchRes.map((item) => item.item))
    } else setCurrentData(data)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    setCurrentData(data)
  }, [data])

  const onFormCreate = async (data) => {
    const { name, description, ...restData } = data
    const formData = {
      ...restData,
      id: formId,
      title: name,
      subtitle: description || '',
      creationDate: getTimestamp().now()
    }
    await setData(COLLECTIONS.FORMS, formId, formData)
      .then(
        edit === false &&
          (await setData(COLLECTIONS.QUESTIONS, questionId, {
            formId: formId,
            id: questionId,
            layoutType: LAYOUT_TYPE_KEYS[0],
            questionType: QUESTION_TYPES.WELCOME_SCREEN,
            title: 'WS.',
            order: 0
          }))
      )
      .catch((e) => message.error(e.message))
  }

  const menu = (
    <Menu>
      {mockRoutes.map((item, index) => (
        <Menu.Item key={index}>
          <Text>{item.page}</Text>
        </Menu.Item>
      ))}
    </Menu>
  )
  const showModal = () => {
    setIsModalVisible(true)
  }
  if (!data) {
    return <Spinner />
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={{ t: translate }}>
          <TypeformConfigurationContext.Provider value={configurations}>
            <Box {...styles.mainWrapper}>
              {/* Page Header */}
              {!firstLevelHidden && (
                <Row noGutters display="flex">
                  <Col cw="auto" v="center">
                    <Button
                      size="small"
                      type="text"
                      style={globalStyles.resetPadding}
                      icon={<ArrowLeftOutlined style={globalStyles.iconSize} />}
                      // onClick={() => history.goBack()}
                    />
                  </Col>
                  <Col cw="auto" v="center">
                    <Divider type="vertical" />
                  </Col>
                  <Col v="center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <FolderOutlined />
                        <Text>Folder</Text>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item overlay={menu}>
                        <Text>Forms</Text>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </Col>
                </Row>
              )}

              {/* SecondaryTitle */}
              <Row noGutters h="between" v="center" mb={1} mt={3}>
                <Col>
                  <Title level={2}>{titleText ?? translate('Forms')}</Title>
                </Col>
                <Col cw="auto">
                  <Button
                    type="primary"
                    onClick={showModal}
                    disabled={disableAddButton}>
                    + {translate('Add')}
                  </Button>
                </Col>
              </Row>
              <Row noGutters mb={3}>
                <Col>
                  <Text>
                    {translate('You have')} {amountFiles} {translate('files')}.
                  </Text>
                </Col>
              </Row>

              <Row noGutters mb={3}>
                <Col>
                  <Input
                    ref={searchRef}
                    placeholder={`${translate(
                      'Search folder/file by name'
                    )}...`}
                    onChange={(input) => searchData(input.target.value)}
                  />
                </Col>
              </Row>

              <Box
                mr="-10px"
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                className="custom-scroll">
                <StaticList
                  data={currentData}
                  columnWidth={(mobileLayout && 2) || 6}
                  setEdit={setEdit}
                />

                <FormSimpleFormWithModal
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  onModalSubmit={onFormCreate}>
                  {childrenModal}
                </FormSimpleFormWithModal>
              </Box>
            </Box>
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
