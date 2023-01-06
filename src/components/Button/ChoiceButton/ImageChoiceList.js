import React, { cloneElement } from 'react'

import { List } from 'antd'
import PropTypes from 'prop-types'

const ImageChoiceList = (props) => {
  const { data, children, buttonKey, hasImages, onButtonClick } = props

  return (
    <List
      grid={{
        gutter: [24, 2],
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4
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

ImageChoiceList.propTypes = {
  data: PropTypes.array,
  children: PropTypes.node,
  buttonKey: PropTypes.string,
  hasImages: PropTypes.bool,
  onButtonClick: PropTypes.func
}

export default ImageChoiceList
