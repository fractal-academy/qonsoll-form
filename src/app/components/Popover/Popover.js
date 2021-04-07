import React, { useEffect, useState } from 'react'
import { Button, Popover } from 'antd'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function CustomPopover(props) {
  const {
    content,
    title,
    btnType,
    btnText,
    btnIcon,
    placement,
    trigger
  } = props
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
    <>
      <Popover
        content={content}
        title={title}
        placement={placement}
        trigger={trigger}>
        <Button type={btnType} icon={btnIcon}>
          {btnText}
        </Button>
      </Popover>
    </>
  )
}

CustomPopover.propTypes = {}

export { CustomPopover }
