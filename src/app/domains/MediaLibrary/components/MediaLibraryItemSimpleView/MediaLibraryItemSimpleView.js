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
import { FormSimpleViewEdit } from 'domains/Form/components'
import { ROUTES_PATHS } from 'app/constants'
import { styles } from './MediaLibraryItemSimpleView.styles'
import { FileOutlined, MoreOutlined } from '@ant-design/icons'
import { Box, Col, Row } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
const { Meta } = Card
const { Text } = Typography

function MediaLibraryItemSimpleView(props) {
  const { imageUrl, name } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user
  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const history = useHistory()
  // [COMPONENT STATE HOOKS]
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  // [COMPUTED PROPERTIES]
  const handleCancel = () => {
    setVisible(false)
  }

  const showPopconfirm = () => {
    setVisible(true)
  }

  // const handleDelete = async () => {
  //   setConfirmLoading(true)
  //   try {
  //     await deleteData(firebase.storage(), id)
  //   } catch (e) {
  //     message.error("Can't delete form")
  //   }
  //
  //   setVisible(false)
  //   setConfirmLoading(false)
  // }

  // const menu = (
  //   <Menu>
  //     <Menu.Item>
  //       <FormSimpleViewEdit formData={props} />
  //     </Menu.Item>
  //     <Menu.Item>
  //       <Popconfirm
  //         title="Delete this form?"
  //         visible={visible}
  //         // onConfirm={handleDelete}
  //         okButtonProps={{ loading: confirmLoading }}
  //         onCancel={handleCancel}>
  //         <Text onClick={showPopconfirm}>Delete</Text>
  //       </Popconfirm>
  //     </Menu.Item>
  //   </Menu>
  // )

  // [CLEAN FUNCTIONS]
  const onFormItemClick = () => {
    history.push(ROUTES_PATHS.FORM_EDIT)
  }
  const onItemSelect = () => {}
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
    // <Card
    // style={styles.cardStyles}
    // bodyStyle={styles.cardBodyPadding}
    // cover={
    <Box>
      <Image
        preview={false}
        width="200px"
        height="200px"
        src={imageUrl}
        // backgroundSize="cover"
        // alt={title}
        // icon={<FileOutlined style={styles.iconStyles} />}
      />
      <Text>{name}</Text>
    </Box>

    // </Card>
  )
}

MediaLibraryItemSimpleView.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default MediaLibraryItemSimpleView
