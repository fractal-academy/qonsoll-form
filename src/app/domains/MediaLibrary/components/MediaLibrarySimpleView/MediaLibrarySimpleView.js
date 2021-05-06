import { Typography } from 'antd'
import { Input } from 'components'
import PropTypes from 'prop-types'
import { EditOutlined } from '@ant-design/icons'
import RangeSlider from 'components/RangeSlider'
import { Box, Col, Row } from '@qonsoll/react-design'
import { styles } from './MediaLibrarySimpleView.styles'
import MediaLibraryModal from 'domains/MediaLibrary/combined/MediaLibraryModal'

const { Text } = Typography

function MediaLibrarySimpleView(props) {
  const { setIsImageEditVisible, bgImage } = props

  return (
    <>
      <Row noGutters mb={4}>
        <Col>
          <Box
            height="150px"
            borderRadius="8px"
            position="relative"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={bgImage}>
            <MediaLibraryModal
              bgImage={bgImage}
              onClick={() => {
                setIsImageEditVisible(false)
              }}
              btnProps={{
                type: 'primary',
                icon: <EditOutlined style={styles.btnStyle} />
              }}
            />
          </Box>
        </Col>
      </Row>
      <Row noGutters mb={4}>
        <Col>
          <Text style={styles.fontStyle}>Alt text</Text>
          <Input style={styles.inputStyle} placeholder="Enter alt here..." />
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <Text style={styles.fontStyle}>Brightness</Text>
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <RangeSlider />
        </Col>
      </Row>
    </>
  )
}

MediaLibrarySimpleView.propTypes = {
  setIsImageEditVisible: PropTypes.func,
  bgImage: PropTypes.string
}

export default MediaLibrarySimpleView
