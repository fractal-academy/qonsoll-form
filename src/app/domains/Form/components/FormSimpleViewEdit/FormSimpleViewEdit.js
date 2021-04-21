import { Button, Form, message, Modal } from 'antd'
import { useState } from 'react'
import { firestore, updateData } from 'app/services/Firestore'
import Title from 'antd/lib/typography/Title'
import COLLECTIONS from 'app/constants/collection'
import { FormSimpleForm } from 'domains/Form/components'
import Text from 'antd/es/typography/Text'

const FormSimpleViewEdit = (props) => {
  const { formData } = props
  // [STATE]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  // [ADDITIONAL_HOOKS]

  const [form] = Form.useForm()

  // [COMPUTED PROPERTIES]

  // [HELPER_FUNCTIONS]

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setLoading(false)
    setIsModalVisible(false)

    form.resetFields()
  }
  const onFormEdit = async (data) => {
    setLoading(true)
    try {
      await updateData(COLLECTIONS.FORMS, formData.id, {
        title: data?.name,
        subtitle: data?.description
      })
    } catch (e) {
      message.error(e)
    }

    form.resetFields()
    setLoading(false)
    setIsModalVisible(false)
  }

  return (
    <>
      <Text onClick={showModal} key={'showModal'}>
        Rename
      </Text>

      <Modal
        title={<Title level={4}>Edit form</Title>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button
            onClick={() => form.submit()}
            type="primary"
            loading={loading}>
            Save changes
          </Button>
        ]}>
        <FormSimpleForm form={form} onFinish={onFormEdit} formData={formData} />
      </Modal>
    </>
  )
}

export default FormSimpleViewEdit
