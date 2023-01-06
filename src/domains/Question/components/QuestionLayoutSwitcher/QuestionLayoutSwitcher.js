import {
  AlignLeftOutlined,
  MenuUnfoldOutlined,
  PicCenterOutlined,
  PicLeftOutlined,
  PicRightOutlined,
  ProfileFilled
} from '@ant-design/icons'
import React, { cloneElement } from 'react'
import { StyledItem, StyledMenu } from './QuestionLayoutSwitcher.styles'

import { LAYOUT_TYPE_KEYS } from '../../../../constants/layoutTypes'
import PropTypes from 'prop-types'

const menuMap = [
  {
    icon: <AlignLeftOutlined />,
    layoutType: LAYOUT_TYPE_KEYS[0]
  },
  {
    icon: <PicCenterOutlined />,
    layoutType: LAYOUT_TYPE_KEYS[1]
  },
  {
    icon: <MenuUnfoldOutlined />,
    layoutType: LAYOUT_TYPE_KEYS[2]
  },
  {
    icon: <PicLeftOutlined />,
    layoutType: LAYOUT_TYPE_KEYS[3]
  },
  {
    icon: <MenuUnfoldOutlined style={{ transform: 'scaleX(-1)' }} />,
    layoutType: LAYOUT_TYPE_KEYS[4]
  },
  {
    icon: <PicRightOutlined />,
    layoutType: LAYOUT_TYPE_KEYS[5]
  },
  {
    icon: <ProfileFilled />,
    layoutType: LAYOUT_TYPE_KEYS[6]
  }
]

function QuestionLayoutSwitcher(props) {
  const { onChange, defaultActive, disabled } = props

  return (
    <StyledMenu selectedKeys={defaultActive}>
      {menuMap?.map((item) => (
        <StyledItem
          disabled={disabled}
          key={item.layoutType}
          onClick={onChange}
          p={2}>
          {cloneElement(item.icon, { style: { margin: 0 } })}
        </StyledItem>
      ))}
    </StyledMenu>
  )
}

QuestionLayoutSwitcher.propTypes = {
  onChange: PropTypes.func,
  defaultActive: PropTypes.string,
  disabled: PropTypes.bool
}

export default QuestionLayoutSwitcher
