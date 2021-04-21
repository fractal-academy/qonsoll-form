import React, { useEffect, useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import {
  Breadcrumb,
  Button,
  Divider,
  Tooltip,
  Typography,
  Form,
  Menu,
  Input,
  Modal,
  message
} from 'antd'
import {
  ArrowLeftOutlined,
  FolderOutlined,
  SettingOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { firestore } from 'app/services'
import { useHistory } from 'react-router'
import { globalStyles } from 'app/styles'
import { styles } from './FormsAll.styles'
import { FormSimpleForm, FormSimpleView } from 'domains/Form/components'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { setData } from 'app/services/Firestore'
import COLLECTIONS from 'app/constants/collection'
import { Spinner } from 'components'

const { Title, Text } = Typography
const mockRoutes = [
  { path: '/forms', page: 'Forms' },
  { path: '/images', page: 'Images' },
  { path: '/videos', page: 'Videos' }
]
const mockList = [0, 1, 2, 8, 9, 10, 11, 6, 7, 8, 9, 10, 6, 7, 8, 9, 10]
function FormsAll(props) {
  //const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const [data] = useCollectionData(firestore.collection('forms'))
  // [COMPONENT STATE HOOKS]
  const [formsList, setFormsList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  // [COMPUTED PROPERTIES]
  let amountFiles = data?.length

  const formId = firestore.collection(COLLECTIONS.FORMS).doc().id
  // [CLEAN FUNCTIONS]
  const onFilterButtonClick = () => {}

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  const onFormCreate = async (data) => {
    setLoading(true)
    try {
      await setData(COLLECTIONS.FORMS, formId, {
        id: formId,
        title: data?.name,
        subtitle: data?.description || ''
      })
    } catch (e) {
      console.error(e.message)
    }
    setLoading(false)
    setIsModalVisible(false)
    form.resetFields()
  }

  const menu = (
    <Menu>
      {mockRoutes.map((item, index) => (
        <Menu.Item key={index}>
          {/* <Link to={item.path}>{item.page}</Link> */}
          <Text>{item.page}</Text>
        </Menu.Item>
      ))}
    </Menu>
  )
  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }
  const showModal = () => {
    setIsModalVisible(true)
  }
  if (!data || loading) {
    return <Spinner />
  }

  return (
    <Box bg="#f6f9fe" flexDirection="column" px={45} py={4} minHeight="100%">
      {/* Page Header */}
      <Row noGutters display="flex">
        <Col cw="auto" p={0} v="center">
          <Button
            size="small"
            type="text"
            style={globalStyles.resetPadding}
            icon={<ArrowLeftOutlined style={globalStyles.iconSize} />}
            onClick={() => history.goBack()}
          />
        </Col>
        <Col cw="auto" p={0} v="center">
          <Divider type="vertical" style={styles.dividerHeight} />
        </Col>
        <Col p={0} v="center">
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
      <Row mb={1} v="center" pt={3}>
        <Col>
          <Title level={2} style={(styles.boldFont, globalStyles.resetMargin)}>
            Forms
          </Title>
        </Col>
        <Col cw="auto" v="center">
          <Tooltip placement="left" title={'Settings'}>
            <SettingOutlined style={globalStyles.iconSize} />
          </Tooltip>
        </Col>
      </Row>
      <Row pb={25}>
        <Col>
          <Text style={styles.textSecondary}>
            You have {amountFiles} folders/files.
          </Text>
        </Col>
      </Row>
      <Row pb={3}>
        <Col>
          <Input
            prefix={<SearchOutlined />}
            style={styles.borderRadius}
            placeholder="Search folder/file by name..."
          />
        </Col>
        <Col cw="auto">
          <Divider type="vertical" style={globalStyles.fullHeight} />
        </Col>
        <Col cw="auto" v="center">
          <Button
            icon={<FilterOutlined />}
            type="secondary"
            style={styles.borderRadius}
            onClick={onFilterButtonClick}>
            Filter
          </Button>
        </Col>
      </Row>
      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        bg="#f6f9fe"
        className="custom-scroll">
        {/* Here should be list of data Images/Video */}
        {data?.map((item, index) => (
          <Box pr={3} pb={3} key={index}>
            <FormSimpleView
              withRedirect
              id={item?.id}
              key={item?.id}
              imageURL={item?.image}
              title={item?.title}
              subtitle={item?.subtitle}
            />
          </Box>
        ))}
        <Box
          bg="#eceff5"
          mr={3}
          mb={3}
          borderRadius="8px"
          width="242px"
          height="214px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={globalStyles.cursorPointer}
          onClick={showModal}>
          <PlusOutlined />
        </Box>
        {/*Modal window form creation*/}
        <Modal
          title={<Title level={4}>Create new typeform</Title>}
          visible={isModalVisible}
          onCancel={handleCancel}
          destroyOnClose
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              loading={loading}
              onClick={() => {
                form.submit()
              }}
              type="primary">
              Create
            </Button>
          ]}>
          <FormSimpleForm form={form} onFinish={onFormCreate} />
        </Modal>
      </Box>
    </Box>
  )
}

FormsAll.propTypes = {}

export default FormsAll
