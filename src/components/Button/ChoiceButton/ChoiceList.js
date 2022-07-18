import React, { cloneElement } from 'react'

import { List } from 'antd'
import PropTypes from 'prop-types'

const ChoiceList = (props) => {
  const { data, children, buttonKey, hasImages, onButtonClick } = props

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
      renderItem={(item, index) => (
        <List.Item key={item?.id || index}>
          {cloneElement(children, {
            index,
            item,
            hasImages,
            onButtonClick,
            isActive: buttonKey === item.letter
          })}
        </List.Item>
      )}
    />
  )
}

ChoiceList.propTypes = {
  data: PropTypes.array,
  children: PropTypes.node
}

export default ChoiceList
