import React from 'react'
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
import { PopoverNegativeMarin } from 'app/styles/NegativeMargin'

const { Meta } = Card

function MediaLibraryItemSimpleView(props) {
  const { imageUrl, selectedBackgroundImg, setSelectedBackgroundImg, title } =
    props

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
          <CustomImage preview={false} src={imageUrl} />
        </Box>
      }>
      <Meta
        description={
          <Row h="between" mt={2} noGutters>
            <Col>
              <Row noGutters>
                <Col>
                  <CustomText ellipsis>
                    {title?.charAt(0).toUpperCase() +
                      title?.slice(1).split('.')[0]}
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
