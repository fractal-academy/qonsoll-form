import React from 'react'
import Fuse from 'fuse.js'
import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
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
import { useHistory } from 'react-router'
import { globalStyles } from 'app/styles'
import { styles } from './FormsAll.styles'
import { Spinner, StaticList } from 'components'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ArrowLeftOutlined, FolderOutlined } from '@ant-design/icons'
import { COLLECTIONS, QUESTION_TYPES } from 'app/constants'
import { getCollectionRef, getTimestamp, setData } from 'app/services/Firestore'
import FormSimpleFormWithModal from 'domains/Form/components/FormSimpleFormWithModal'
import TypeformConfigurationContext from 'app/context/TypeformConfigurationContext'

const { Title, Text } = Typography

const mockRoutes = [
  { path: '/forms', page: 'Forms' },
  { path: '/images', page: 'Images' },
  { path: '/videos', page: 'Videos' }
]
function FormsAll(props) {
  const { configurations } = props

  // [ADDITIONAL HOOKS]
  const searchRef = useRef()
  const history = useHistory()
  const [data] = useCollectionData(
    getCollectionRef(COLLECTIONS.FORMS).orderBy('creationDate', 'desc')
  )
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
    await setData(COLLECTIONS.FORMS, formId, {
      id: formId,
      title: data?.name,
      subtitle: data?.description || '',
      creationDate: getTimestamp().now()
    })
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
    <TypeformConfigurationContext.Provider value={configurations}>
      <Box {...styles.mainWrapper}>
        {/* Page Header */}
        <Row noGutters display="flex">
          <Col cw="auto" v="center">
            <Button
              size="small"
              type="text"
              style={globalStyles.resetPadding}
              icon={<ArrowLeftOutlined />}
              onClick={() => history.goBack()}
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
        {/* SecondaryTitle */}
        <Row noGutters h="between" v="center" mb={1} mt={3}>
          <Col>
            <Title level={2}>Forms</Title>
          </Col>
          <Col cw="auto">
            <Button type="primary" onClick={showModal}>
              + Add
            </Button>
          </Col>
        </Row>
        <Row noGutters mb={3}>
          <Col>
            <Text>You have {amountFiles} files.</Text>
          </Col>
        </Row>

        <Row noGutters mb={3}>
          <Col>
            <Input
              ref={searchRef}
              placeholder="Search folder/file by name..."
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
          <StaticList columnWidth={2} data={currentData} setEdit={setEdit} />

          <FormSimpleFormWithModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            onModalSubmit={onFormCreate}
          />
        </Box>
      </Box>
    </TypeformConfigurationContext.Provider>
  )
}

FormsAll.propTypes = {
  configurations: PropTypes.object.isRequired
}

export default FormsAll
