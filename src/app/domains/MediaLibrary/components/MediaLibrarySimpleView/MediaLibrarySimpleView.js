import React, { useEffect, useState } from 'react'
import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Card } from 'antd'
import { EditOutlined, EyeFilled, PlusOutlined } from '@ant-design/icons'
import { styles } from './MediaLibrarySimpleView.styles'
import MediaLibraryModal from 'domains/MediaLibrary/combined/MediaLibraryModal'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'
import { Popover } from 'components'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function MediaLibrarySimpleView(props) {
  const { setIsImageEditVisible } = props
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]

  const [showPopoverIcon, setShowPopoverIcon] = useState(false)
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
    <Row>
      <Col>
        <Row>
          <Box width="224px" height="366px">
            <MediaLibraryModal
              onClick={() => {
                setIsImageEditVisible(false)
              }}
              btnProps={{
                type: 'primary',
                icon: <EditOutlined />,
                style: styles.btnStyle
              }}
            />
          </Box>
        </Row>
        <Row>
          <Col>Alt text will be here</Col>
        </Row>
        <Row>
          <Col>Brightness settings</Col>
          <Col>Brightness value</Col>
        </Row>
      </Col>
    </Row>
  )
}

MediaLibrarySimpleView.propTypes = {}

export default MediaLibrarySimpleView
