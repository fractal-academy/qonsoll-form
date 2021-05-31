import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledItem } from 'components'
import { ROUTES_PATHS } from 'app/constants'
import { useHistory } from 'react-router-dom'
import COLLECTIONS from 'app/constants/collection'
import React, { useState, cloneElement } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { FileOutlined, MoreOutlined, CloseOutlined } from '@ant-design/icons'
import { deleteData, updateData } from 'app/services/Firestore'
import { Typography, Dropdown, Menu, Popconfirm, Image, message } from 'antd'
import FormSimpleFormWithModal from 'domains/Form/components/FormSimpleFormWithModal'

const { Text } = Typography

const ItemPreview = styled(Box)`
  display: flex;
  width: -webkit-fill-available;
  height: 140px;
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
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

function ListItem(props) {
  const { data, onClick } = props

  // [ADDITIONAL HOOKS]
  const history = useHistory()

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false)

  // [COMPUTED PROPERTIES]
  const description = data?.subtitle || 'No description'
  const formRoute = ROUTES_PATHS.FORM_EDIT.replace(':id', data?.id)

  // [CLEAN FUNCTIONS]
  const onFormItemClick = (e) => {
    formRoute && history.push(formRoute)
  }
  const showPopconfirm = () => {
    setIsPopconfirmVisible(!isPopconfirmVisible)
  }
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleDelete = async () => {
    setConfirmLoading(true)
    await deleteData(COLLECTIONS.FORMS, data?.id).catch((e) =>
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
        <ItemPreview onClick={!data?.imageUrl && onFormItemClick}>
          {data?.imageUrl ? (
            <StyledImage preview={false} height="inherit" src={data.imageUrl} />
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
              <CloseOutlined />
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
  onClick: PropTypes.func
}

export default ListItem
