import React, { useEffect, useState } from 'react'
import { Modal, Button, Typography, Input, Divider, Upload } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import Icon, {
  FilterOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons'
import { globalStyles } from 'app/styles'
import { styles } from './MediaLibraryModal.styles'
import PropTypes from 'prop-types'
import './MediaLibraryModal.styles.css'
import {
  MediaLibraryFilter,
  MediaLibraryItemSimpleView
} from 'domains/MediaLibrary/components'
import MediaLibrarySimpleView from 'domains/MediaLibrary/components/MediaLibrarySimpleView'
// import { useTranslation } from 'react-i18next'
// import storage from 'app/services/Firebase'
import firebase, { firestore } from 'app/services/Firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getCollectionRef, setData } from 'app/services/Firestore'
import COLLECTIONS from 'app/constants/collection'

const { Title, Text } = Typography

function MediaLibraryModal(props) {
  const { data, btnProps, onClick } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  const [media = []] = useCollectionData(
    getCollectionRef(COLLECTIONS.MEDIA) /*.orderBy('creationDate', 'desc')*/
  )
  console.log(media)
  const onMediaUploaded = (data) => {
    const mediaId = firestore.collection(COLLECTIONS.MEDIA).doc().id
    setData(COLLECTIONS?.MEDIA, mediaId, data)
  }
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [switchState, setSwitchState] = useState(false)
  const [sidebarState, setSidebarState] = useState(true)
  const [imagesList, setImagesList] = useState(media)

  // [COMPUTED PROPERTIES]
  const amountFiles = imagesList.length
  // [CLEAN FUNCTIONS]
  const onModalContinue = () => {
    setIsModalVisible(!isModalVisible)
  }
  const onModalCancel = () => {
    setIsModalVisible(!isModalVisible)
  }
  const onFilterButtonClick = () => {
    setSidebarState(!sidebarState)
  }
  const onApplyFilter = () => {
    setSidebarState(!sidebarState)
  }
  const onCancelFilter = () => {
    setSidebarState(!sidebarState)
  }
  const onSwitchChange = () => {
    setSwitchState(!switchState)
  }
  const modalStateChange = () => {
    setIsModalVisible(!isModalVisible)
    onClick && onClick()
    // setIsImageEditVisible(false)
  }
  // const onAddForm = () => {
  //   setImagesList((prev) => [
  //     ...prev,
  //     {
  //       title: 'new Title ',
  //       subtitle: 'subtitle'
  //     }
  //   ])
  // }
  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true
    imagesList && setImagesList(media)

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
  }, [media])

  return (
    <>
      <Button {...btnProps} onClick={modalStateChange} style={styles.btnStyle}>
        <Text style={styles.btnFont}>Change</Text>
      </Button>
      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        width="950px"
        bodyStyle={styles.modalBodyStyle}>
        <Row>
          <Col>
            <Row mb={1} v="center" px={3} pt={3}>
              <Col>
                <Title
                  level={3}
                  style={(styles.boldFont, globalStyles.resetMargin)}>
                  Media Library
                </Title>
              </Col>
              <Col cw="auto" v="center">
                <Box bg="#eceff5" p={1} borderRadius="4px">
                  <Button
                    size="small"
                    type={switchState ? 'text' : 'secondary'}
                    //can`t move style to separate file because of state dependency
                    style={{
                      borderRadius: '4px',
                      border: 0,
                      color: switchState ? '#82868c' : '#1d6fdc'
                    }}
                    onClick={onSwitchChange}>
                    Image
                  </Button>
                  <Button
                    size="small"
                    type={!switchState ? 'text' : 'secondary'}
                    //same here
                    style={{
                      borderRadius: '4px',
                      border: 0,
                      color: !switchState ? '#82868c' : '#1d6fdc'
                    }}
                    onClick={onSwitchChange}>
                    Video
                  </Button>
                </Box>
              </Col>
            </Row>
            <Row pb={25} px={3}>
              <Col>
                <Text style={styles.textSecondary}>
                  You have {amountFiles} files.
                </Text>
              </Col>
            </Row>
            <Row px={3} pb={3}>
              <Col>
                <Input
                  prefix={<SearchOutlined />}
                  style={styles.borderRadius}
                  placeholder="Search media file by name..."
                />
              </Col>
              <Col cw="auto">
                <Divider type="vertical" style={styles.dividerStyles} />
              </Col>
              <Col cw="auto" v="center">
                <Button
                  icon={<FilterOutlined />}
                  type="text"
                  style={styles.borderRadius}
                  onClick={onFilterButtonClick}>
                  Filter
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Divider type="horizontal" style={globalStyles.resetMargin} />
              </Col>
            </Row>
            <Box
              height="500px"
              pl={3}
              overflow="auto"
              display="flex"
              flexWrap="wrap"
              flexDirection="row"
              bg="#f6f9fe"
              className="custom-scroll">
              {/* Here should be list of data Images/Video */}

              {imagesList.map((item) => (
                <Box mr={3} mb={3}>
                  <MediaLibraryItemSimpleView
                    // key={item}
                    // title={item.title}
                    // subtitle={item.subtitle}
                    // image={item.imageUrl}
                    // name={item.name}
                    {...item}
                  />
                </Box>
              ))}
              {/*==================================*/}
              <Upload
                showUploadList={false}
                multiple
                name="file"
                customRequest={(data) => {
                  const { onSuccess } = data
                  const ref = firebase
                    .storage()
                    .ref('images')
                    .child(data.file.uid)

                  const image = ref.put(data.file)
                  image.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {
                      // Handle error during the upload
                      console.error('message')
                    },
                    () => {
                      image.snapshot.ref
                        .getDownloadURL()
                        .then((downloadURL) => {
                          setImagesList([
                            ...imagesList,
                            {
                              // key: { data.file.uid },
                              name: data.file.name,
                              imageUrl: downloadURL,
                              title: 'New title',
                              subtitle: 'subtitle'
                            }
                          ])
                          onMediaUploaded({
                            name: data.file.name,
                            imageUrl: downloadURL,
                            title: 'New title',
                            subtitle: 'subtitle'
                          })
                        })
                        .then(() => onSuccess())
                    }
                  )
                }}>
                <Box
                  bg="#eceff5"
                  mr={3}
                  mb={3}
                  borderRadius="8px"
                  width="216px"
                  height="206px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={globalStyles.cursorPointer}
                  // onClick={onAddForm}
                >
                  <PlusOutlined />
                </Box>
              </Upload>
            </Box>
            <Row>
              <Col>
                <Divider type="horizontal" style={globalStyles.resetMargin} />
              </Col>
            </Row>
            <Row h="right" p={3} bg="white">
              <Col cw="auto">
                <Button
                  type="text"
                  style={styles.footerButtonStyle}
                  onClick={onModalCancel}>
                  Cancel
                </Button>
              </Col>
              <Col cw="auto">
                <Button
                  type="primary"
                  style={styles.footerButtonStyle}
                  onClick={onModalContinue}>
                  Continue
                </Button>
              </Col>
            </Row>
          </Col>
          {sidebarState && (
            <MediaLibraryFilter
              onApplyFilter={onApplyFilter}
              onCancelFilter={onCancelFilter}
            />
          )}
        </Row>
      </Modal>
    </>
  )
}
MediaLibraryModal.defaultProps = {
  btnProps: { children: 'Open Modal' }
}
MediaLibraryModal.propTypes = {
  btnProps: PropTypes.object.isRequired,
  data: PropTypes.array
}

export default MediaLibraryModal
