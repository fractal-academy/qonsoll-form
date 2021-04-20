import React, { useEffect, useState } from 'react'
import {
  PicCenterOutlined,
  PicRightOutlined,
  PicLeftOutlined,
  AlignLeftOutlined,
  ProfileFilled,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import { styles } from './QuestionLayoutSwitcher.styles'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'
// import { useTranslation } from 'react-i18next'

const menuMap = [
  { icon: <AlignLeftOutlined />, layoutType: LAYOUT_TYPE_KEYS[0] },
  { icon: <PicCenterOutlined />, layoutType: LAYOUT_TYPE_KEYS[1] },
  { icon: <MenuUnfoldOutlined />, layoutType: LAYOUT_TYPE_KEYS[2] },
  { icon: <PicLeftOutlined />, layoutType: LAYOUT_TYPE_KEYS[3] },
  {
    icon: <MenuUnfoldOutlined style={{ transform: 'scaleX(-1)' }} />,
    layoutType: LAYOUT_TYPE_KEYS[4]
  },
  { icon: <PicRightOutlined />, layoutType: LAYOUT_TYPE_KEYS[5] },
  { icon: <ProfileFilled />, layoutType: LAYOUT_TYPE_KEYS[6] }
]

function QuestionLayoutSwitcher(props) {
  const { onChange, defaultActive } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  return (
    <Menu style={styles.menuStyle} defaultSelectedKeys={defaultActive}>
      {menuMap.map((item) => (
        <Menu.Item
          key={item.layoutType}
          icon={item.icon}
          onClick={onChange}
          style={styles.menuItemStyle}
        />
      ))}
    </Menu>
  )
}

QuestionLayoutSwitcher.propTypes = {}

export default QuestionLayoutSwitcher
