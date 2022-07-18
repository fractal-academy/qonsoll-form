import { AddNewChoiceBox } from './ChoiceEditableGroup.styles'
import { ChoiceEditable } from '../../components'
import { Icon } from '@qonsoll/icons'
import { List } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const ChoiceList = (props) => {
  const { data, withImage, onAddChoice } = props

  return (
    <List
      grid={{
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1
      }}
      dataSource={data}
      renderItem={(item, index) =>
        item?.isCreate ? (
          <List.Item>
            <AddNewChoiceBox height={72} onClick={onAddChoice}>
              <Icon name="PlusOutlined" size={20} />
            </AddNewChoiceBox>
          </List.Item>
        ) : (
          <List.Item key={item?.id || index}>
            <ChoiceEditable
              key={index}
              data={item}
              index={index}
              withImage={withImage}
            />
          </List.Item>
        )
      }
    />
  )
}

ChoiceList.propTypes = {
  data: PropTypes.array,
  withImage: PropTypes.bool,
  onAddChoice: PropTypes.func
}

export default ChoiceList
