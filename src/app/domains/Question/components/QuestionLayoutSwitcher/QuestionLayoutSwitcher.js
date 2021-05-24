import {
  PicCenterOutlined,
  PicRightOutlined,
  PicLeftOutlined,
  AlignLeftOutlined,
  ProfileFilled,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import { styles, StyledMenu, StyledItem } from './QuestionLayoutSwitcher.styles'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'

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

  return (
    <StyledMenu selectedKeys={defaultActive}>
      {menuMap.map((item) => (
        <StyledItem key={item.layoutType} icon={item.icon} onClick={onChange} />
      ))}
    </StyledMenu>
  )
}

QuestionLayoutSwitcher.propTypes = {
  onChange: PropTypes.func,
  defaultActive: PropTypes.string
}

export default QuestionLayoutSwitcher
