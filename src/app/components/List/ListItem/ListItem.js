import PropTypes from 'prop-types'
import styled from 'styled-components'
import React, { useState } from 'react'
import { StyledItem } from 'components'
import { ROUTES_PATHS } from 'app/constants'
import { useHistory } from 'react-router-dom'
import COLLECTIONS from 'app/constants/collection'
import { Row, Col, Box } from '@qonsoll/react-design'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {
  deleteData,
  updateData,
  getCollectionRef
} from 'app/services/Firestore'
import {
  Popconfirm,
  Typography,
  Dropdown,
  Menu,
  Image,
  Button,
  message
} from 'antd'
import FormSimpleFormWithModal from 'domains/Form/components/FormSimpleFormWithModal'
import {
  FileOutlined,
  MoreOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons'

const { Text } = Typography

const ItemPreview = styled(Box)`
  display: flex;
  position: relative;
  width: -webkit-fill-available;
  height: 140px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: white;
`
const StyledIcon = styled(FileOutlined)`
  font-size: 40px;
  opacity: 0.5;
`
const StyledImage = styled(Image)`
  border-radius: 8px;
`
const StyledBadge = styled(Button)`
  position: absolute;
  border-radius: 50%;
  height: 24px;
  z-index: 100;
  padding: 3px;
  width: 24px;
  right: -4px;
  top: -4px;
`

function ListItem(props) {
  const { data, setEdit, selectedBackgroundImg, setSelectedBackgroundImg } =
    props

  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const [questions] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', data?.id)
  )

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false)

  // [COMPUTED PROPERTIES]
  const description = data?.subtitle || 'No description'
  const formRoute = ROUTES_PATHS.FORM_EDIT.replace(':id', data?.id)
  const collection = data?.imageUrl ? COLLECTIONS.MEDIA : COLLECTIONS.FORMS

  // [CLEAN FUNCTIONS]
  const onFormItemClick = (e) => {
    e.stopPropagation()
    formRoute && history.push(formRoute)
  }
  const showPopconfirm = ({ domEvent }) => {
    domEvent.stopPropagation()
    setIsPopconfirmVisible(!isPopconfirmVisible)
  }
  const showModal = ({ domEvent }) => {
    domEvent.stopPropagation()
    setIsModalVisible(true)
  }
  const handleDelete = async () => {
    setConfirmLoading(true)
    await deleteData(collection, data?.id)
      .then(deleteQuestions)
      .catch((e) => message.error(e.message))

    setIsPopconfirmVisible(false)
    setConfirmLoading(false)
  }
  const deleteQuestions = () => {
    questions.forEach((item) => {
      deleteData(COLLECTIONS.QUESTIONS, item?.id).catch((e) =>
        message.error(e.message)
      )
    })
  }
  const onModalSubmit = async (values) => {
    await updateData(COLLECTIONS.FORMS, data?.id, {
      title: values?.name,
      subtitle: values?.description
    }).catch((e) => message.error(e.message))
  }

  // [MENU TEMPLATE]
  const menu = (
    <Menu>
      <Menu.Item onClick={(e) => showModal(e)} key={'showModal'}>
        <Text>Rename</Text>
        <FormSimpleFormWithModal
          isEdit
          formData={data}
          setEdit={setEdit}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onModalSubmit={onModalSubmit}
        />
      </Menu.Item>

      <Menu.Item onClick={(e) => showPopconfirm(e)} key={'showPopconfirm'}>
        <Popconfirm
          visible={isPopconfirmVisible}
          onConfirm={handleDelete}
          title="Delete this form?"
          okButtonProps={{ loading: confirmLoading }}>
          <Text>Delete</Text>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )

  return (
    <StyledItem
      isCard
      onClick={
        !data?.imageUrl
          ? onFormItemClick
          : () => setSelectedBackgroundImg(data?.imageUrl)
      }>
      <Box display="block" width="inherit">
        <ItemPreview>
          {data?.imageUrl ? (
            <>
              {selectedBackgroundImg === data?.imageUrl && (
                <StyledBadge size="small" type="primary">
                  <CheckOutlined />
                </StyledBadge>
              )}
              <StyledImage
                preview={false}
                height="inherit"
                src={data.imageUrl}
              />
            </>
          ) : (
            <StyledIcon />
          )}
        </ItemPreview>

        <Row noGutters h="between" mt={2}>
          <Col display="grid">
            <Text ellipsis>{data?.title}</Text>
            <Text ellipsis type="secondary">
              {description}
            </Text>
          </Col>
          <Col cw="auto" display="flex" v="center">
            {data?.imageUrl ? (
              <Popconfirm
                title="Delete this image?"
                onConfirm={handleDelete}
                okButtonProps={{ loading: confirmLoading }}>
                <CloseOutlined />
              </Popconfirm>
            ) : (
              <Dropdown overlay={menu} placement="bottomRight">
                <MoreOutlined
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                />
              </Dropdown>
            )}
          </Col>
        </Row>
      </Box>
    </StyledItem>
  )
}

ListItem.propTypes = {
  data: PropTypes.object,
  selectedBackgroundImg: PropTypes.bool,
  setSelectedBackgroundImg: PropTypes.func
}

export default ListItem
