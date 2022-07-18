import { AddNewChoiceBox } from './ChoiceEditableGroup.styles'
import { ChoiceEditable } from '../../components'
import { Icon } from '@qonsoll/icons'
import { List } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const MediaList = (props) => {
  const { data, withImage, onAddChoice } = props

  return (
    <List
      grid={{
        gutter: [24, 16],
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4
      }}
      dataSource={data}
      renderItem={(item, index) =>
        item?.isCreate ? (
          <List.Item>
            <AddNewChoiceBox height={180} onClick={onAddChoice}>
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

MediaList.propTypes = {
  data: PropTypes.array,
  withImage: PropTypes.bool,
  onAddChoice: PropTypes.func
}

export default MediaList
