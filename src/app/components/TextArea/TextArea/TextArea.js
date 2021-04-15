import React, { useEffect } from 'react'
import { Input } from 'antd'
import { styles } from './TextArea.styles'

const { TextArea } = Input

// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

const CustomTextArea = (props) => {
  const { textAreaProps, btnProps, noBorder, btnIcon } = props

  useEffect(() => {
    let isComponentMounted = true

    return () => {
      isComponentMounted = false
    }
  }, [])

  return (
    <TextArea
      style={styles.textAreaStyle}
      placeholder="Type your answer here..."
      autoSize={{ minRows: 1, maxRows: 6 }}
      bordered={!noBorder}
      btnIcon={btnIcon}
      {...textAreaProps}
      {...btnProps}
    />
  )
}

CustomTextArea.propTypes = {}

export { CustomTextArea }
