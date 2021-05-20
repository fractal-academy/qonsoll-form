import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledItem } from 'components'
import { ROUTES_PATHS } from 'app/constants'
import { useHistory } from 'react-router-dom'
import { useState, cloneElement, useEffect, useRef } from 'react'
import COLLECTIONS from 'app/constants/collection'
import { Row, Col, Box } from '@qonsoll/react-design'
import { FileOutlined, MoreOutlined } from '@ant-design/icons'
import { deleteData, updateData } from 'app/services/Firestore'
import { Typography, Dropdown, Menu, Popconfirm, message } from 'antd'
import FormSimpleFormWithModal from 'domains/Form/components/FormSimpleFormWithModal'

const { Text } = Typography

const StyledImage = styled(Box)`
  display: flex;
  width: ${(props) => props.size[0] - 16}px;
  height: ${(props) => (props.size[1] / 3) * 2}px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: white;
`
const StyledIcon = styled(FileOutlined)`
  font-size: 40px;
  opacity: 0.5;
`

function ListItem(props) {
  const { data, size } = props

  // [ADDITIONAL HOOKS]
  const DropdownRef = useRef()
  const history = useHistory()

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false)

  // [COMPUTED PROPERTIES]
  const description = data?.subtitle || 'No description'
  const formRoute = ROUTES_PATHS.FORM_EDIT.replace(':id', data?.id)

  // [CLEAN FUNCTIONS]
  const handleDropdownClick = (e) => {
    e.stopPropagation()
    setIsDropdownVisible(true)
  }
  const onFormItemClick = (e) => {
    formRoute && history.push(formRoute)
  }
  const showPopconfirm = () => {
    setIsDropdownVisible(true)
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
          formData={props}
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
    <StyledItem size={size} onClick={onFormItemClick}>
      <Box display="block">
        <StyledImage size={size}>
          <StyledIcon />
        </StyledImage>
        <Row noGutters h="between" mt={2}>
          <Col display="grid">
            <Text ellipsis>{data?.title}</Text>
            <Text type="secondary" ellipsis>
              {description}
            </Text>
          </Col>

          <Col cw="auto" v="center">
            <Dropdown
              ref={DropdownRef}
              overlay={menu}
              trigger="click"
              placement="bottomRight"
              onClick={handleDropdownClick}>
              {cloneElement(<MoreOutlined />, {
                className: 'dropdownIcon'
              })}
            </Dropdown>
          </Col>
        </Row>
      </Box>
    </StyledItem>
  )
}

ListItem.propTypes = {
  size: PropTypes.array,
  data: PropTypes.object
}

export default ListItem
