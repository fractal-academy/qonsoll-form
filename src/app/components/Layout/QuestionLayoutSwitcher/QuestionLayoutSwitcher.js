import React, { useEffect, useState } from 'react'
import {
  PicCenterOutlined,
  PicRightOutlined,
  PicLeftOutlined,
  AlignLeftOutlined,
  ProfileFilled
} from '@ant-design/icons'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import { styles } from './QuestionLayoutSwitcher.style'
import { globalStyles } from 'app/styles'
// import { useTranslation } from 'react-i18next'

const menuMap = [
  { icon: <AlignLeftOutlined /> },
  { icon: <PicCenterOutlined /> },
  { icon: <PicLeftOutlined /> },
  { icon: <PicRightOutlined /> },
  { icon: <ProfileFilled /> }
]

function QuestionLayoutSwitcher(props) {
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

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
    <Menu
      style={styles.menuStyle}
      defaultSelectedKeys={['1']}
      // selectedKeys={}
    >
      {menuMap.map((item, index) => (
        <Menu.Item
          key={index + 1}
          icon={item.icon}
          onClick={(data) => {
            console.log(data)
          }}
          style={styles.menuItemStyle}
        />
      ))}
    </Menu>
  )
}

QuestionLayoutSwitcher.propTypes = {}

export default QuestionLayoutSwitcher
