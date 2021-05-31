import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledItem } from '../../../components'
import { COLLECTIONS } from '../../../constants'
import { Row, Col, Box } from '@qonsoll/react-design'
import {
  Popconfirm,
  Typography,
  Dropdown,
  Menu,
  Image,
  Button,
  message
} from 'antd'
import { FormSimpleFormWithModal } from '../../../domains/Form/components'
import {
  FileOutlined,
  MoreOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons'
import useFunctions from '../../../hooks/useFunctions'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'

const { Text } = Typography

const ItemPreview = styled(Box)`
  display: flex;
  position: relative;
  width: -webkit-fill-available;
  height: 140px;
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white.default};
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
  const { updateData, deleteData } = useFunctions()
  const { data, selectedBackgroundImg, setSelectedBackgroundImg } = props

  // [CUSTOM_HOOKS]
  const { onFormItemClick } = useActionsFunctionsContext()
  // [ADDITIONAL HOOKS]

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false)

  // [COMPUTED PROPERTIES]
  const description = data?.subtitle || 'No description'
  const collection = data?.imageUrl ? COLLECTIONS.MEDIA : COLLECTIONS.FORMS

  // [CLEAN FUNCTIONS]
  const onFormItemClickDisplay = () => {
    onFormItemClick?.(data?.id)
    // formRoute && history.push(formRoute)
  }
  const showPopconfirm = () => {
    setIsPopconfirmVisible(!isPopconfirmVisible)
  }
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleDelete = async () => {
    setConfirmLoading(true)
    await deleteData(collection, data?.id).catch((e) =>
      message.error(e.message)
    )

    setIsPopconfirmVisible(false)
    setConfirmLoading(false)
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
      <Menu.Item onClick={showModal} key={'showModal'}>
        <Text>Rename</Text>
        <FormSimpleFormWithModal
          isEdit
          formData={data}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onModalSubmit={onModalSubmit}
        />
      </Menu.Item>

      <Menu.Item onClick={showPopconfirm} key={'showPopconfirm'}>
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
    <StyledItem isCard>
      <Box display="block" width="inherit">
        <ItemPreview
          onClick={
            !data?.imageUrl
              ? onFormItemClickDisplay
              : () => setSelectedBackgroundImg(data?.imageUrl)
          }>
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
              <Dropdown overlay={menu} trigger="click" placement="bottomRight">
                <MoreOutlined />
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
