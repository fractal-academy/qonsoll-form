import { useState, useEffect } from 'react'
import { Avatar, Spin, Typography } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import FileUploader from 'react-firebase-file-uploader'
import { ImageLabel } from 'components'
import PropTypes from 'prop-types'
import { Col, Row, Box } from '@qonsoll/react-design'

const { Text } = Typography

const ImageUploader = (props) => {
  const { imageUrl, isResetImage } = props

  //[COMPONENT STATE HOOKS]
  const [isUploading, setIsUploading] = useState(false)
  const [avatarURL, setAvatarURL] = useState(imageUrl)

  //[USE_EFFECTS]
  useEffect(() => {
    if (isResetImage) {
      setAvatarURL('')
    }
  }, [isResetImage])

  const handleUploadStart = () => {
    setIsUploading(true)
    setAvatarURL('')
  }
  //
  const handleUploadError = () => {
    setIsUploading(false)
    setAvatarURL(imageUrl)
  }
  //add functional upload file
  const handleUploadSuccess = (filename) => {}

  return (
    <Row h="center">
      <Col cw="auto">
        <Box justifyContent="center" display="flex" width="100%">
          <Box>
            <Spin spinning={isUploading} style={{ width: '100%' }}>
              <Avatar
                style={{
                  width: '150px',
                  height: '100px',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                className={avatarURL && 'animate__animated animate__zoomIn'}
                shape="square"
                src={avatarURL}>
                <ImageLabel>
                  {!isUploading &&
                    (avatarURL ? (
                      <>
                        <EditOutlined className="animate__animated  animate__zoomIn" />
                        <Text style={{ color: 'white' }}>Change</Text>
                      </>
                    ) : (
                      <>
                        <PlusOutlined
                          style={{ paddingRight: '5px' }}
                          className="animate__animated  animate__zoomIn"
                        />
                        <Text style={{ color: 'white' }}>Add</Text>
                      </>
                    ))}
                  {/*Need to add storageRef  for example storageRef={storage.ref('images')}*/}
                  <FileUploader
                    hidden
                    accept="image/*"
                    randomizeFilename
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                  />
                </ImageLabel>
              </Avatar>
            </Spin>
          </Box>
        </Box>
      </Col>
    </Row>
  )
}

export default ImageUploader

ImageUploader.propTypes = {
  isResetImage: PropTypes.bool,
  imageUrl: PropTypes.string
}
