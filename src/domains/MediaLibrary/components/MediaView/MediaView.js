import { Button, Card, Col, Img, Row, Title } from '@qonsoll/react-design'
import React, { useMemo } from 'react'

import { Icon } from '@qonsoll/icons'
import { Popconfirm } from 'antd'
import PropTypes from 'prop-types'
import { useRemoveMedia } from '../../hooks/remove'
import { useTranslations } from '@qonsoll/translation'

const MediaView = (props) => {
  const { id, title, imageUrl, selected, handleSelect } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const { removeMedia, removeLoading } = useRemoveMedia()

  // [COMPUTED PROPERTIES]
  const boxShadow = useMemo(
    () =>
      imageUrl === selected ? '0px 0px 0px 2px var(--ql-color-accent1)' : '',
    [imageUrl, selected]
  )

  // [HELPER FUNCTIONS]
  const handleClick = () => {
    handleSelect(imageUrl)
  }
  const handleRemove = () => {
    removeMedia(id)
  }

  return (
    <Card
      boxShadow={boxShadow}
      size="small"
      bordered={false}
      onClick={handleClick}
      bg="var(--qf-card-bg)"
      borderRadius="var(--qf-card-border-radius)">
      <Row noGutters mb="16px">
        <Col cw={12} borderRadius="var(--qf-card-border-radius)">
          <Img
            height={140}
            src={imageUrl}
            objectFit="cover"
            borderRadius="inherit"
          />
        </Col>
      </Row>

      <Row v="center">
        <Col>
          <Title level={5} clamp="1" wordBreak="break-all">
            {title}
          </Title>
        </Col>

        <Col cw="auto">
          <Popconfirm
            okType="danger"
            okText={t('Delete')}
            cancelText={t('Cancel')}
            onConfirm={handleRemove}
            title={t('Remove image?')}
            okButtonProps={{ loading: removeLoading }}>
            <Button danger icon={<Icon name="TrashFilled" size={20} />} />
          </Popconfirm>
        </Col>
      </Row>
    </Card>
  )
}

MediaView.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  selected: PropTypes.bool,
  handleSelect: PropTypes.func
}

export default MediaView
