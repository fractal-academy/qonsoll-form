import { useState, useEffect, useRef } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import Fuse from 'fuse.js'
import {
  Breadcrumb,
  Button,
  Divider,
  Typography,
  Menu,
  Input,
  Form,
  Modal,
  message
} from 'antd'
import { ArrowLeftOutlined, FolderOutlined } from '@ant-design/icons'
import { firestore } from 'app/services'
import { useHistory } from 'react-router'
import { globalStyles } from 'app/styles'
import { FormSimpleForm, FormSimpleView } from 'domains/Form/components'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getCollectionRef, getTimestamp, setData } from 'app/services/Firestore'
import COLLECTIONS from 'app/constants/collection'
import { Spinner, NewListItem, StaticList, ListItem } from 'components'

const { Title, Text } = Typography
const mockRoutes = [
  { path: '/forms', page: 'Forms' },
  { path: '/images', page: 'Images' },
  { path: '/videos', page: 'Videos' }
]
function FormsAll(props) {
  // [ADDITIONAL HOOKS]
  const searchRef = useRef()
  const history = useHistory()
  const [data] = useCollectionData(
    getCollectionRef(COLLECTIONS.FORMS).orderBy('creationDate', 'desc')
  )
  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [currentData, setCurrentData] = useState(data)
  const fuse = new Fuse(data, { keys: ['title'] })

  // [COMPUTED PROPERTIES]
  let amountFiles = data?.length

  const formId = firestore.collection(COLLECTIONS.FORMS).doc().id
  // [CLEAN FUNCTIONS]
  const searchData = () => {
    if (searchRef.current.input.value) {
      const searchRes = fuse.search(searchRef.current.input.value)
      setCurrentData(searchRes.map((item) => item.item))
    } else setCurrentData(data)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    data && setCurrentData(data)
  }, [data])

  const onFormCreate = async (data) => {
    setLoading(true)
    await setData(COLLECTIONS.FORMS, formId, {
      id: formId,
      title: data?.name,
      subtitle: data?.description || '',
      creationDate: getTimestamp().now()
    }).catch((e) => message.error(e.message))

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
    <Box flexDirection="column" px={45} py={4} minHeight="100%">
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
          <Divider type="vertical" />
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
      <Row noGutters v="center" mb={1} mt={3}>
        <Col>
          <Title level={2} style={globalStyles.resetMargin}>
            Forms
          </Title>
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
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        className="custom-scroll">
        <ListItem id={1} />
        {/* Here should be list of data Images/Video */}
        {/* {currentData?.map((item, index) => (
          <Box pr={3} pb={3} key={index}>
            <FormSimpleView
              id={item?.id}
              key={item?.id}
              title={item?.title}
              imageURL={item?.image}
              subtitle={item?.subtitle}
            />
          </Box>
        ))} */}

        <StaticList currentData={currentData} />

        <NewListItem showModal={showModal} />

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
