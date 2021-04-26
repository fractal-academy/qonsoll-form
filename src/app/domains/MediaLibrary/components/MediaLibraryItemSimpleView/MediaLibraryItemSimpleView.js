import React, { cloneElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { deleteData } from 'app/services/Firestore'
import COLLECTIONS from 'app/constants/collection'
import {
  Avatar,
  Card,
  Dropdown,
  Image,
  Menu,
  message,
  Popconfirm,
  Typography
} from 'antd'
import { styles } from './MediaLibraryItemSimpleView.styles'
import { Box, Col, Row } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
const { Meta } = Card
const { Text } = Typography

function MediaLibraryItemSimpleView(props) {
  const { imageUrl, name, setMediaUrl, setSelectedBackgroundImg } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user
  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const history = useHistory()
  // [COMPONENT STATE HOOKS]
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

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
    <Card
      onClick={() => {
        setMediaUrl(imageUrl)
        setSelectedBackgroundImg(imageUrl)
      }}
      hoverable
      style={styles.cardStyles}
      bodyStyle={styles.cardBodyStye}
      cover={
        <Box
          borderRadius="8px"
          display="flex"
          bg="white"
          justifyContent="center"
          alignItems="center">
          <Image
            preview={false}
            width="208px"
            height="136px"
            src={imageUrl}
            style={styles.imageStyle}
          />
        </Box>
      }>
      <Meta
        description={
          <Row h="between" mt={3}>
            <Col>
              <Row>
                <Col>
                  <Text style={styles.titleStyle} ellipsis>
                    {name.charAt(0).toUpperCase() + name.slice(1).split('.')[0]}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      />
    </Card>
  )
}

MediaLibraryItemSimpleView.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default MediaLibraryItemSimpleView
