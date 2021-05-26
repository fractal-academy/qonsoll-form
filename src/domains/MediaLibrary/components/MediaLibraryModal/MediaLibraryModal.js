import Fuse from 'fuse.js'
import PropTypes from 'prop-types'
import theme from '../../../../../styles/theme'
import { Row, Col, Box } from '@qonsoll/react-design'
import { storage } from '../../../../services/Firebase'
import COLLECTIONS from '../../../../constants/collection'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Typography, Upload, message } from 'antd'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getCollectionRef, setData } from '../../../../services/Firestore'
import { FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import {
  CustomBox,
  CustomButton,
  CustomChangeButtonText,
  CustomDivider,
  CustomInput,
  CustomText,
  styles
} from './MediaLibraryModal.styles'
import {
  MediaLibraryFilter,
  MediaLibraryItemSimpleView
} from '../../../../domains/MediaLibrary/components'

const { Title } = Typography

function MediaLibraryModal(props) {
  const { btnProps, onClick, onContinue } = props

  // [ADDITIONAL HOOKS]
  const [media = []] = useCollectionData(getCollectionRef(COLLECTIONS.MEDIA))

  const searchRef = useRef()

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [switchState, setSwitchState] = useState(false)
  const [sidebarState, setSidebarState] = useState(true)
  const [imagesList, setImagesList] = useState(media)
  const [selectedBackgroundImg, setSelectedBackgroundImg] = useState(false)
  const fuse = new Fuse(media, { keys: ['name'] })

  // [COMPUTED PROPERTIES]
  const amountFiles = imagesList.length
  const mediaId = getCollectionRef(COLLECTIONS.MEDIA).doc().id

  // [CLEAN FUNCTIONS]
  const onMediaUploaded = (data) => {
    const mediaId = getCollectionRef(COLLECTIONS.MEDIA).doc().id
    setData(COLLECTIONS?.MEDIA, mediaId, data).catch((e) =>
      message.error(e.message)
    )
  }
  const onModalContinue = async () => {
    setIsModalVisible(!isModalVisible)
    onContinue && onContinue(selectedBackgroundImg)
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
    onClick?.()
  }
  const onChange = (input) => {
    searchData(input.target.value)
  }
  const customRequest = (data) => {
    const { onSuccess } = data
    const ref = storage.ref('images').child(data.file.uid)
    const image = ref.put(data.file)
    image.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        // Handle error during the upload
        message.error(error.message)
      },
      () => {
        image.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
            setImagesList([
              ...imagesList,
              {
                id: mediaId,
                name: data.file.name,
                imageUrl: downloadURL,
                title: 'New title',
                subtitle: 'subtitle'
              }
            ])
            onMediaUploaded({
              id: mediaId,
              name: data.file.name,
              imageUrl: downloadURL,
              title: 'New title',
              subtitle: 'subtitle'
            })
          })
          .then(() => onSuccess())
      }
    )
  }
  const searchData = () => {
    if (searchRef.current.input.value) {
      const searchRes = fuse.search(searchRef.current.input.value)
      setImagesList(searchRes.map((item) => item.item))
    } else setImagesList(media)
  }
  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true
    isComponentMounted && imagesList && setImagesList(media)

    // [CLEAN UP FUNCTION]

    return () => {
      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [media])
  return (
    <>
      <CustomButton {...btnProps} onClick={modalStateChange}>
        <CustomChangeButtonText>Change</CustomChangeButtonText>
      </CustomButton>
      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        width="1024px"
        centered
        bodyStyle={styles.modalBodyStyle}>
        <Row noGutters pt={4}>
          <Col>
            <Row mb={1} v="center" px={3}>
              <Col>
                <Title level={3}>Media Library</Title>
              </Col>
              <Col cw="auto" v="center">
                <Box
                  bg={theme.color.dark.t.lighten7}
                  p={1}
                  borderRadius={theme.borderRadius.md}
                  display="flex">
                  <CustomBox
                    size="medium"
                    type={!switchState ? 'text' : 'secondary'}
                    switchState={!switchState}
                    onClick={onSwitchChange}>
                    Image
                  </CustomBox>
                  <CustomBox
                    size="medium"
                    type={switchState ? 'secondary' : 'text'}
                    switchState={switchState}
                    onClick={onSwitchChange}>
                    Video
                  </CustomBox>
                </Box>
              </Col>
            </Row>
            <Row pb={25} px={3}>
              <Col>
                <CustomText>You have {amountFiles} files.</CustomText>
              </Col>
            </Row>
            <Row px={3} pb={3}>
              <Col>
                <CustomInput
                  allowClear
                  ref={searchRef}
                  prefix={<SearchOutlined />}
                  placeholder="Search media file by name..."
                  onSearch={searchData}
                  onChange={onChange}
                />
              </Col>
              <Col cw="auto" noGutters>
                <CustomDivider type="vertical" />
              </Col>
              <Col cw="auto" v="center">
                <Button
                  icon={<FilterOutlined />}
                  type="text"
                  onClick={onFilterButtonClick}>
                  Filter
                </Button>
              </Col>
            </Row>

            <Box
              height="500px"
              pl={4}
              overflow="auto"
              display="flex"
              flexWrap="wrap"
              flexDirection="row"
              bg={theme.color.dark.t.lighten9}>
              {/* RENDER MEDIA */}

              {imagesList.map((item) => (
                <Box key={item} mr={3} mt={4}>
                  <MediaLibraryItemSimpleView
                    {...item}
                    selectedBackgroundImg={selectedBackgroundImg}
                    setSelectedBackgroundImg={setSelectedBackgroundImg}
                  />
                </Box>
              ))}
              <Upload
                showUploadList={false}
                multiple
                name="file"
                customRequest={customRequest}>
                <Box
                  {...styles.addButton}
                  bg={theme.color.dark.t.lighten9}
                  mr={3}
                  mt={4}
                  borderRadius={theme.borderRadius.md}
                  width="216px"
                  height="182px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <PlusOutlined />
                </Box>
              </Upload>
            </Box>
            <Row
              borderBottom="1px solid"
              borderColor={theme.color.text.dark}></Row>
            <Row noGutters h="right" p={3} bg={theme.color.white.default}>
              <Col cw="auto">
                <Button type="text" onClick={onModalCancel}>
                  Cancel
                </Button>
              </Col>
              <Col cw="auto">
                <Button type="primary" onClick={onModalContinue}>
                  Continue
                </Button>
              </Col>
            </Row>
          </Col>
          {!sidebarState && (
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
