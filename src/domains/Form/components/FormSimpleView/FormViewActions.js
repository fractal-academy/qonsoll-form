import { Button, Dropdown, Menu, Popconfirm, Typography } from 'antd'

import { FormSimpleFormWithModal } from '..'
import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { useEditForm } from '../../hooks/edit'
import { useRemoveForm } from '../../hooks/remove'
import { useTranslations } from '@qonsoll/translation'

const { Text } = Typography

const FormViewActions = (props) => {
  const { form, firebase } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const editForm = useEditForm(firebase)
  const removeForm = useRemoveForm(form)

  // [COMPUTED PROPERTIES]
  const popconfirm = `${t('Are you sure you want to remove form')}?`

  const menu = (
    <Menu>
      <FormSimpleFormWithModal
        title="Edit form"
        defaultValues={form}
        onSubmit={editForm}
        triggerNode={
          <Menu.Item>
            <div display="flex" alignItems="center">
              <Icon name="EditFilled" mr="8px" />
              <Text>{t('Edit form')}</Text>
            </div>
          </Menu.Item>
        }
      />

      <Popconfirm
        placement="bottomRight"
        title={popconfirm}
        onConfirm={removeForm}
        okText={t('Remove')}
        cancelText={t('Cancel')}
      >
        <Menu.Item danger>
          <div display="flex" alignItems="center">
            <Icon name="TrashFilled" mr="8px" />
            <Text>{t('Remove form')}</Text>
          </div>
        </Menu.Item>
      </Popconfirm>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <Button icon={<Icon size={20} name="MenuVerticalFilled" />} />
    </Dropdown>
  )
}

FormViewActions.propTypes = {
  form: PropTypes.object,
  firebase: PropTypes.object
}

export default FormViewActions
