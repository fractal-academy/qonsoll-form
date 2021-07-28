import Fuse from 'fuse.js'
import PropTypes from 'prop-types'
import theme from '../../../../../styles/theme'
import { Row, Col, Box } from '@qonsoll/react-design'
import { SearchOutlined, EditOutlined } from '@ant-design/icons'
import { StaticList } from '../../../../components'
import useFunctions from '../../../../hooks/useFunctions'
import React, { useEffect, useRef, useState } from 'react'
import COLLECTIONS from '../../../../constants/collection'
import { useTranslation } from '../../../../context/Translation'
import { Modal, Button, Typography, Upload, message } from 'antd'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {
  MediaListContainer,
  CustomButton,
  CustomInput,
  CustomText
} from './MediaLibraryModal.styles'
import { MediaLibraryFilter } from '../../../../domains/MediaLibrary/components'

const { Title } = Typography

function MediaLibraryModal(props) {
  const { btnProps, onClick, onContinue, isHovering } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef, setData, storage } = useFunctions()

  // [ADDITIONAL HOOKS]
  const [media = []] = useCollectionData(getCollectionRef(COLLECTIONS.MEDIA))
  const { amountTitle, changeButton, searchPlaceholder, mediaLibraryTitle } =
    useTranslation()

  const searchRef = useRef()

  // [COMPONENT STATE HOOKS]
  // const [switchState, setSwitchState] = useState(false)
  const [selectedBackgroundImg, setSelectedBackgroundImg] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [sidebarState, setSidebarState] = useState(true)
  const [imagesList, setImagesList] = useState(media)

  // [COMPUTED PROPERTIES]
  const amountFiles = imagesList.length
  const fuse = new Fuse(media, { keys: ['title'] })

  // [CLEAN FUNCTIONS]
  const onMediaUploaded = (data) => {
    const mediaId = getCollectionRef(COLLECTIONS.MEDIA).doc().id
    setData(COLLECTIONS?.MEDIA, mediaId, { id: mediaId, ...data }).catch((e) =>
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
  const onApplyFilter = () => {
    setSidebarState(!sidebarState)
  }
  const onCancelFilter = () => {
    setSidebarState(!sidebarState)
  }
  const modalStateChange = () => {
    setIsModalVisible(!isModalVisible)
    onClick?.()
  }
  const onChange = (input) => {
    searchData(input.target.value)
  }
  // const onSwitchChange = () => {
  //   setSwitchState(!switchState)
  // }
  // const onFilterButtonClick = () => {
  //   setSidebarState(!sidebarState)
  // }
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
                title: data.file.name,
                imageUrl: downloadURL
              }
            ])
            onMediaUploaded({
              title: data.file.name,
              imageUrl: downloadURL
            })
          })
          .then(() => onSuccess())
      }
    )
  }
  const searchData = () => {
    if (searchRef.current.input.value) {
      const searchRes = fuse.search(searchRef.current.input.value)
      setImagesList(searchRes?.map((item) => item.item))
    } else setImagesList(media)
  }

  const beforeUpload = (file) => {
    if (!file?.type?.includes('image')) {
      message.error(`${file.name} is not a picture`)
    }
    return file?.type?.includes('image') ? true : Upload.LIST_IGNORE
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
    // eslint-disable-next-line
  }, [media])

  return (
    <>
      {isHovering && (
        <CustomButton {...btnProps} onClick={modalStateChange}>
          <Box display="flex">
            <Box mr={2}>
              <EditOutlined />
            </Box>
            {changeButton || 'Change'}
          </Box>
        </CustomButton>
      )}
      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        width="1024px"
        centered
        bodyStyle={{
          // gonna use this height when filter is on
          // height: '768px',
          padding: 0,
          zIndex: 10000
        }}>
        <Row noGutters pt={3}>
          <Col style={{ flexDirection: 'column' }}>
            <Row v="center" px={3}>
              <Col>
                <Title level={3}>{mediaLibraryTitle || 'Media Library'}</Title>
              </Col>
              {/* <Col cw="auto" v="center">
                For future improvements.
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
                
                <Upload
                  showUploadList={false}
                  multiple
                  name="file"
                  customRequest={customRequest}
                  beforeUpload={beforeUpload}>
                  <Button
                    type="primary"
                    onMouseDown={(e) => e.preventDefault()}>
                    {addButton || '+ Add'}
                  </Button>
                </Upload>
              </Col> */}
            </Row>
            <Row pb={2} px={3}>
              <Col>
                <CustomText>
                  {amountTitle || 'Amount of shown files: '}
                  {amountFiles}
                </CustomText>
              </Col>
            </Row>
            <Row px={3} pb={3}>
              <Col>
                <CustomInput
                  allowClear
                  ref={searchRef}
                  prefix={<SearchOutlined style={{ paddingRight: '10px' }} />}
                  placeholder={
                    searchPlaceholder || 'Search media file by name...'
                  }
                  onSearch={searchData}
                  onChange={onChange}
                />
              </Col>
              {/* <Col cw="auto" noGutters>
                <CustomDivider type="vertical" />
              </Col>
              <Col cw="auto" v="center">
                <Button
                  icon={<FilterOutlined />}
                  type="text"
                  onClick={onFilterButtonClick}>
                  Filter
                </Button>
              </Col> */}
            </Row>

            <MediaListContainer px={4} pt={2}>
              {/* RENDER MEDIA */}
              <StaticList
                hasMedia
                data={imagesList}
                beforeUpload={beforeUpload}
                customRequest={customRequest}
                columnWidth={(sidebarState && 3) || 4}
                selectedBackgroundImg={selectedBackgroundImg}
                setSelectedBackgroundImg={setSelectedBackgroundImg}
              />
            </MediaListContainer>
            <Row
              noGutters
              borderBottomLeftRadius={theme?.borderRadius?.md}
              borderBottomRightRadius={theme?.borderRadius?.md}
              h="right"
              p={3}
              bg={theme.color.white.default}>
              <Col cw="auto" mr={2}>
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
