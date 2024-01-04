import { Empty, List } from 'antd'

import { FormSimpleView } from '..'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslations } from '@qonsoll/translation'

const FormList = (props) => {
  const { forms, firebase } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

  return (
    <List
      dataSource={forms}
      grid={{
        gutter: [32, 16],
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4
      }}
      locale={{
        emptyText: <Empty description={t('There is no forms created yet')} />
      }}
      renderItem={(item, index) => (
        <List.Item key={item?.id || index}>
          <FormSimpleView {...item} firebase={firebase} />
        </List.Item>
      )}
    />
  )
}

FormList.propTypes = {
  forms: PropTypes.array,
  firebase: PropTypes.object
}

export default FormList
