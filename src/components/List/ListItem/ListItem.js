import { Box, Col, Row, Text, Title } from '@qonsoll/react-design'
import { CheckOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Popconfirm, message } from 'antd'
import {
  ItemPreview,
  StyledBadge,
  StyledIcon,
  StyledImage,
  StyledMenu
} from './ListItem.styles'
import React, { forwardRef, useState } from 'react'

import { COLLECTIONS } from '../../../constants'
import { FormSimpleFormWithModal } from '../../../domains/Form/components'
import PropTypes from 'prop-types'
import { StyledItem } from '../../../components'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import useFunctions from '../../../hooks/useFunctions'
import { useTranslations } from '@qonsoll/translation'

const { Item } = Menu

const ListItem = forwardRef((props, ref) => {
  const { data, setEdit, selectedBackgroundImg, setSelectedBackgroundImg } =
    props
  const { updateData, deleteData, getCollectionRef } = useFunctions()

  // [ADDITIONAL HOOKS]
  const [questions] = useCollectionData(
    data?.id &&
      getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', data?.id)
  )
  const [userAnswersGroup] = useCollectionData(
    data?.id &&
      getCollectionRef(COLLECTIONS.USER_ANSWERS_GROUP).where(
        'formId',
        '==',
        data?.id
      )
  )

  const [answers] = useCollectionData(
    data?.id &&
      getCollectionRef(COLLECTIONS.ANSWERS).where('formId', '==', data?.id)
  )
  const { onFormItemClick, onFormDelete } = useActionsFunctionsContext()
  const { t } = useTranslations()

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false)

  // [COMPUTED PROPERTIES]
  const description = data?.subtitle || t('No description')
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
      .then(deleteAnswers)
      .then(deleteUserAnswersGroup)
      .then(() => {
        onFormDelete?.(data?.buyingTypeId)
      })
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
  const deleteUserAnswersGroup = () => {
    userAnswersGroup.forEach((item) => {
      deleteData(COLLECTIONS.USER_ANSWERS_GROUP, item?.id).catch((e) =>
        message.error(e.message)
      )
    })
  }
  const deleteAnswers = () => {
    answers.forEach((item) => {
      deleteData(COLLECTIONS.ANSWERS, item?.id).catch((e) =>
        message.error(e.message)
      )
    })
  }
  const onModalSubmit = (updatedFormData) => {
    updateData(COLLECTIONS.FORMS, data?.id, updatedFormData).catch((e) =>
      message.error(e.message)
    )
  }

  // [MENU TEMPLATE]
  const menu = (
    <StyledMenu>
      <Item onClick={(e) => showModal(e)} key={'showModal'}>
        <Text color="var(--qf-typography-subtitle-color)">{t('Edit')}</Text>
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
          title={t('Remove form?')}
          okButtonProps={{ loading: confirmLoading }}
          okType="danger"
          okText="Delete">
          <Text color="var(--ql-color-danger)">{t('Delete')}</Text>
        </Popconfirm>
      </Item>
    </StyledMenu>
  )

  return (
    <StyledItem
      isCard
      ref={ref}
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
            <Title
              color="var(--qf-typography-subtitle-color)"
              wordBreak="break-all"
              ellipsis={true}
              textOverflow="ellipsis"
              level={5}>
              {data?.title}
            </Title>
            {!data?.imageUrl && (
              <Text
                color="var(--qf-typography-subtitle-color)"
                wordBreak="break-all"
                ellipsis={true}
                textOverflow="ellipsis"
                type="secondary">
                {description}
              </Text>
            )}
          </Col>
          <Col cw="auto" display="flex" v="center">
            {data?.imageUrl ? (
              <Popconfirm
                title={t('Remove image?')}
                onConfirm={handleDelete}
                okButtonProps={{ loading: confirmLoading }}
                okType="danger"
                okText="Delete">
                <DeleteOutlined />
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
})

ListItem.propTypes = {
  data: PropTypes.object,
  selectedBackgroundImg: PropTypes.bool,
  setSelectedBackgroundImg: PropTypes.func
}

export default ListItem
