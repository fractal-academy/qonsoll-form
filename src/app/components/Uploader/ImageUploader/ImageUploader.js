import { useState, useEffect } from 'react'
import { Avatar, Spin, Typography } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import FileUploader from 'react-firebase-file-uploader'
import { ImageLabel } from 'components'
import PropTypes from 'prop-types'
import { Col, Row, Box } from '@qonsoll/react-design'
import { globalStyles } from 'app/styles'
import { styles } from './ImageUploader.styles'

const { Text } = Typography

const ImageUploader = (props) => {
  const { imageUrl, isResetImage } = props

  //[COMPONENT STATE HOOKS]
  const [isUploading, setIsUploading] = useState(false)
  const [backgroundImageURL, setBackgroundImageURL] = useState(imageUrl)

  //[USE_EFFECTS]
  useEffect(() => {
    if (isResetImage) {
      setBackgroundImageURL('')
    }
  }, [isResetImage])

  const handleUploadStart = () => {
    setIsUploading(true)
    setBackgroundImageURL('')
  }
  //
  const handleUploadError = () => {
    setIsUploading(false)
    setBackgroundImageURL(imageUrl)
  }
  //add functional upload file
  const handleUploadSuccess = (filename) => {}

  return (
    <Row h="center" noGutters>
      <Col cw="auto">
        <Box justifyContent="center" display="flex" width="100%">
          <Box>
            <Spin spinning={isUploading} style={globalStyles.fullWidth}>
              <Avatar
                style={styles.backgroundStyle}
                className={
                  backgroundImageURL && 'animate__animated animate__zoomIn'
                }
                shape="square"
                src={backgroundImageURL}>
                <ImageLabel>
                  {!isUploading &&
                    (backgroundImageURL ? (
                      <>
                        <EditOutlined
                          style={styles.iconPadding}
                          className="animate__animated  animate__zoomIn"
                        />
                        Change
                      </>
                    ) : (
                      <>
                        <PlusOutlined
                          style={styles.iconPadding}
                          className="animate__animated  animate__zoomIn"
                        />
                        Add
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
