import Fuse from 'fuse.js'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import { StaticList } from 'components'
import { storage } from 'app/services/Firebase'
import { Row, Col } from '@qonsoll/react-design'
import COLLECTIONS from 'app/constants/collection'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Typography, Upload, message } from 'antd'
import { getCollectionRef, setData } from 'app/services/Firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { MediaLibraryFilter } from 'domains/MediaLibrary/components'
import {
  CustomChangeButtonText,
  CustomButton,
  CustomDivider,
  CustomInput,
  CustomText,
  MediaListContainer,
  styles
} from './MediaLibraryModal.styles'

const { Title } = Typography

function MediaLibraryModal(props) {
  const { btnProps, onClick, onContinue } = props

  // [ADDITIONAL HOOKS]
  const searchRef = useRef()
  const [media = []] = useCollectionData(getCollectionRef(COLLECTIONS.MEDIA))

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  // const [switchState, setSwitchState] = useState(false)
  const [sidebarState, setSidebarState] = useState(true)
  const [imagesList, setImagesList] = useState(media)
  const [selectedBackgroundImg, setSelectedBackgroundImg] = useState(false)

  // [COMPUTED PROPERTIES]
  const amountFiles = imagesList.length
  const fuse = new Fuse(media, { keys: ['name'] })

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
  const onFilterButtonClick = () => {
    setSidebarState(!sidebarState)
  }
  const onApplyFilter = () => {
    setSidebarState(!sidebarState)
  }
  const onCancelFilter = () => {
    setSidebarState(!sidebarState)
  }
  // const onSwitchChange = () => {
  //   setSwitchState(!switchState)
  // }
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
          <Col style={{ flexDirection: 'column' }}>
            <Row mb={1} v="center" px={3}>
              <Col>
                <Title level={3}>Media Library</Title>
              </Col>
              <Col cw="auto" v="center">
                {/* For future improvements.
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
                </Box> */}
                <Upload
                  showUploadList={false}
                  multiple
                  name="file"
                  customRequest={customRequest}>
                  <Button type="primary">+ Add</Button>
                </Upload>
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

            <MediaListContainer pl={2} pt={2}>
              {/* RENDER MEDIA */}
              <StaticList
                data={imagesList}
                columnWidth={(sidebarState && 3) || 4}
                selectedBackgroundImg={selectedBackgroundImg}
                setSelectedBackgroundImg={setSelectedBackgroundImg}
              />
            </MediaListContainer>
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
