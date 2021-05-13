import { Button, Form, message, Modal } from 'antd'
import { useState } from 'react'
import { firestore, updateData } from 'app/services/Firestore'
import Title from 'antd/lib/typography/Title'
import COLLECTIONS from 'app/constants/collection'
import { FormSimpleForm } from 'domains/Form/components'
import Text from 'antd/es/typography/Text'

const FormSimpleFormWithModal = (props) => {
  const {
    formData,
    isModalVisible,
    setIsModalVisible,
    onModalSubmit,
    isEdit
  } = props
  // [STATE]
  const [loading, setLoading] = useState(false)
  // [ADDITIONAL_HOOKS]

  const [form] = Form.useForm()

  // [COMPUTED PROPERTIES]

  // [HELPER_FUNCTIONS]

  const handleCancel = () => {
    setLoading(false)
    setIsModalVisible(false)
    form.resetFields()
  }
  const onFormEdit = async (data) => {
    setLoading(true)
    onModalSubmit(data)
    form.resetFields()
    setLoading(false)
    setIsModalVisible(false)
  }

  return (
    <>
      <Modal
        title={
          <Title level={4}>{isEdit ? 'Edit form' : 'Create new form'}</Title>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button
            onClick={() => form.submit()}
            type="primary"
            loading={loading}>
            {isEdit ? 'Save changes' : 'Create form'}
          </Button>
        ]}>
        <FormSimpleForm form={form} onFinish={onFormEdit} formData={formData} />
      </Modal>
    </>
  )
}

export default FormSimpleFormWithModal
