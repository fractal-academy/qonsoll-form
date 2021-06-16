import React, { useState } from 'react'
import { Button, Form, Modal } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useTranslation } from '../../../../context/Translation'
import { FormSimpleForm } from '../../../../domains/Form/components'

const FormSimpleFormWithModal = (props) => {
  const {
    formData,
    setEdit,
    isModalVisible,
    setIsModalVisible,
    onModalSubmit,
    isEdit,
    children
  } = props

  // [STATE]
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()
  const {
    formModalTitleCreate,
    formModalTitleEdit,
    formModalSaveChangesButton,
    formModalCreateButton
  } = useTranslation()

  // [HELPER_FUNCTIONS]
  const handleCancel = async () => {
    await setLoading(false)
    await setIsModalVisible(false)
    form.resetFields()
  }
  const onFormEdit = async (data) => {
    setLoading(true)
    onModalSubmit(data)
    !isEdit && form.resetFields()
    setLoading(false)
    setIsModalVisible(false)
    setEdit && setEdit(isEdit)
  }
  // [COMPUTED PROPERTIES]

  return (
    <Modal
      title={
        <Title level={4}>
          {isEdit
            ? formModalTitleEdit || 'Edit form'
            : formModalTitleCreate || 'Create new form'}
        </Title>
      }
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button
          onClick={() => {
            handleCancel()
          }}>
          Cancel
        </Button>,
        <Button onClick={() => form.submit()} type="primary" loading={loading}>
          {isEdit
            ? formModalSaveChangesButton || 'Save changes'
            : formModalCreateButton || 'Create form'}
        </Button>
      ]}>
      <FormSimpleForm
        form={form}
        formData={formData}
        children={children}
        onFinish={onFormEdit}
      />
    </Modal>
  )
}

export default FormSimpleFormWithModal
