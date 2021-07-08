import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledItem } from '../../../components'
import { COLLECTIONS } from '../../../constants'
import { Row, Col, Box } from '@qonsoll/react-design'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {
  Popconfirm,
  Typography,
  Dropdown,
  Menu,
  Image,
  Button,
  message
} from 'antd'
import { useTranslation } from '../../../context/Translation'
import { FormSimpleFormWithModal } from '../../../domains/Form/components'
import {
  FileOutlined,
  MoreOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons'
import useFunctions from '../../../hooks/useFunctions'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'
import typeformTheme from '../../../../styles/theme'

const { Text } = Typography
const { Item } = Menu

const ItemPreview = styled(Box)`
  display: flex;
  position: relative;
  width: -webkit-fill-available;
  height: 140px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme?.color?.white?.default || typeformTheme?.color?.white?.default};
`
const StyledIcon = styled(FileOutlined)`
  font-size: 40px;
  opacity: 0.5;
`
const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
`
const StyledBadge = styled(Button)`
  position: absolute;
  border-radius: 50%;
  height: 24px;
  z-index: 100;
  padding: 3px;
  width: 24px;
  right: -14px;
  top: -14px;
`

function ListItem(props) {
  const { data, selectedBackgroundImg, setSelectedBackgroundImg, setEdit } =
    props
  const { updateData, deleteData, getCollectionRef } = useFunctions()

  // [ADDITIONAL HOOKS]
  const [questions] = useCollectionData(
    data?.id &&
      getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', data?.id)
  )
  const { onFormItemClick } = useActionsFunctionsContext()
  const {
    listItemNoDescription,
    edit,
    popconfirmDeleteFormTitle,
    popconfirmDeleteButtonText,
    popconfirmDeleteImageTitle
  } = useTranslation()

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false)

  // [COMPUTED PROPERTIES]
  const description =
    data?.subtitle || listItemNoDescription || 'No description'
  const collection = data?.imageUrl ? COLLECTIONS.MEDIA : COLLECTIONS.FORMS

  // [CLEAN FUNCTIONS]
  const onFormItemClicked = (e) => {
    e.stopPropagation()
    onFormItemClick?.(data?.id)
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
  const onModalSubmit = async (updatedFormData) => {
    await updateData(COLLECTIONS.FORMS, data?.id, updatedFormData).catch((e) =>
      message.error(e.message)
    )
  }

  // [MENU TEMPLATE]
  const menu = (
    <Menu>
      <Item onClick={(e) => showModal(e)} key={'showModal'}>
        <Text>{edit || 'Edit'}</Text>
        <FormSimpleFormWithModal
          isEdit
          formData={data}
          setEdit={setEdit}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onModalSubmit={onModalSubmit}
        />
      </Item>

      <Item onClick={(e) => showPopconfirm(e)} key={'showPopconfirm'} danger>
        <Popconfirm
          visible={isPopconfirmVisible}
          onConfirm={handleDelete}
          title={popconfirmDeleteFormTitle || 'Delete this form?'}
          okButtonProps={{ loading: confirmLoading }}
          okType="danger"
          okText="Delete">
          <Text>{popconfirmDeleteButtonText || 'Delete'}</Text>
        </Popconfirm>
      </Item>
    </Menu>
  )

  return (
    <StyledItem
      isCard
      onClick={
        !data?.imageUrl
          ? onFormItemClicked
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
                title={popconfirmDeleteImageTitle || 'Delete this image?'}
                onConfirm={handleDelete}
                okButtonProps={{ loading: confirmLoading }}
                okType="danger"
                okText="Delete">
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
