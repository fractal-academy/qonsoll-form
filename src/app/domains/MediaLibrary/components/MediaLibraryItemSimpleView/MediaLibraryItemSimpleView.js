import PropTypes from 'prop-types'
import { CheckOutlined } from '@ant-design/icons'
import { Box, Col, Row } from '@qonsoll/react-design'
import { Card } from 'antd'
import {
  CustomButton,
  CustomCard,
  CustomImage,
  CustomText,
  styles
} from './MediaLibraryItemSimpleView.styles'

const { Meta } = Card

function MediaLibraryItemSimpleView(props) {
  const {
    imageUrl,
    name,
    selectedBackgroundImg,
    setSelectedBackgroundImg
  } = props

  return (
    <CustomCard
      onClick={() => {
        setSelectedBackgroundImg(imageUrl)
      }}
      hoverable
      bodyStyle={styles.cardBodyStye}
      cover={
        <Box>
          {selectedBackgroundImg === imageUrl && (
            <CustomButton size="small" type="primary">
              <CheckOutlined />
            </CustomButton>
          )}
          <CustomImage
            preview={false}
            height="136px"
            width="208px"
            src={imageUrl}
          />
        </Box>
      }>
      <Meta
        description={
          <Row h="between" mt={2} noGutters>
            <Col>
              <Row noGutters>
                <Col>
                  <CustomText ellipsis>
                    {name.charAt(0).toUpperCase() + name.slice(1).split('.')[0]}
                  </CustomText>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      />
    </CustomCard>
  )
}

MediaLibraryItemSimpleView.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default MediaLibraryItemSimpleView
