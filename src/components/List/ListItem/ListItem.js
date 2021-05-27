import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledItem } from '../../../components'
import { useHistory } from 'react-router-dom'
import COLLECTIONS from '../../../constants/collection'
import React, { useState, cloneElement } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { FileOutlined, MoreOutlined } from '@ant-design/icons'
import { Typography, Dropdown, Menu, Popconfirm, message } from 'antd'
import FormSimpleFormWithModal from '../../../domains/Form/components/FormSimpleFormWithModal'
import useFunctions from "../../../hooks/useFunctions"
import {useActionsFunctionsContext} from '../../../context/ActionsFunctions/useActionsFunctionsContext'

const { Text } = Typography

const StyledImage = styled(Box)`
  display: flex;
  width: ${(props) => props.size[0] - 16}px;
  height: ${(props) => (props.size[1] / 3) * 2}px;
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background-color: ${({theme})=>theme.color.white.default};
`
const StyledIcon = styled(FileOutlined)`
  font-size: 40px;
  opacity: 0.5;
`

function ListItem(props) {
  const { data, size } = props
  const { updateData,deleteData} = useFunctions()

  // [CUSTOM_HOOKS]
  const {onFormItemClick} = useActionsFunctionsContext()
  // [ADDITIONAL HOOKS]
  // const history = useHistory()

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false)

  // [COMPUTED PROPERTIES]
  const description = data?.subtitle || 'No description'
  // const formRoute = routes?.EDIT.replace(':id', data?.id)

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
    <StyledItem size={size} isCard>
      <Box display="block">
        <StyledImage onClick={onFormItemClickDisplay} size={size}>
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
            <Dropdown overlay={menu} trigger="click" placement="bottomRight">
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
