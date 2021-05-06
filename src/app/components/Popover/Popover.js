import PropTypes from 'prop-types'
import { Button, Popover } from 'antd'

function CustomPopover(props) {
  const {
    onClick,
    content,
    title,
    btnType,
    btnText,
    btnIcon,
    placement,
    trigger,
    visible,
    onVisibleChange
  } = props

  return (
    <Popover
      content={content}
      title={title}
      placement={placement}
      trigger={trigger}
      visible={visible}
      onVisibleChange={onVisibleChange}>
      <Button type={btnType} icon={btnIcon} onClick={onClick}>
        {btnText}
      </Button>
    </Popover>
  )
}

CustomPopover.propTypes = {
  content: PropTypes.object.isRequired,
  title: PropTypes.string,
  btnType: PropTypes.string.isRequired,
  btnText: PropTypes.string,
  btnIcon: PropTypes.object,
  placement: PropTypes.string,
  trigger: PropTypes.string
}

export { CustomPopover }
