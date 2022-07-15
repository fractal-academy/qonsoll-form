import { Button, Text, Title } from '@qonsoll/react-design'
import { Form, Modal } from 'antd'
import React, { cloneElement, useState } from 'react'

import { FormSimpleForm } from '../../../../domains/Form/components'
import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import { useTranslations } from '@qonsoll/translation'

const FormSimpleFormWithModal = (props) => {
  const { title, defaultValues, onSubmit, triggerNode, children } = props

  // [STATE]
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()
  const { t } = useTranslations()

  // [HELPER_FUNCTIONS]
  const handleCancel = async () => {
    await setLoading(false)
    await setVisible(false)
    form.resetFields()
  }

  const onFormSubmit = (data) => {
    setLoading(true)

    const updatedData = defaultValues
      ? { id: defaultValues?.id, ...data }
      : data

    onSubmit(updatedData)
    form.resetFields()

    setLoading(false)
    setVisible(false)
  }

  const showModal = () => setVisible(true)

  return (
    <>
      {triggerNode ? (
        cloneElement(triggerNode, { onClick: showModal })
      ) : (
        <Button type="primary" onClick={showModal}>
          <Icon
            mr="8px"
            size={22}
            name="PlusOutlined"
            fill="var(--btn-primary-color)"
          />
          {t('Add new form')}
        </Button>
      )}
      <Modal
        destroyOnClose
        closable={false}
        visible={visible}
        title={
          <Title
            level={4}
            color="var(--qf-typography-title-color)"
            fontFamily="var(--ql-font-family-main)">
            {t(title)}
          </Title>
        }
        footer={[
          <Button onClick={handleCancel}>{t('Cancel')}</Button>,
          <Button
            onClick={() => form.submit()}
            loading={loading}
            type="primary">
            {t('Save')}
          </Button>
        ]}>
        <FormSimpleForm
          form={form}
          children={children}
          onFinish={onFormSubmit}
          formData={defaultValues}
        />
      </Modal>
    </>
  )
}

export default FormSimpleFormWithModal
