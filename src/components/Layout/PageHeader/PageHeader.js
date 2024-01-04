import { Button, Col, Divider, Row, Typography } from 'antd'

import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import React from 'react'

const { Title, Text } = Typography

function PageHeader(props) {
  const { title, titleProps, subtitle, subtitleProps, onBack, actions } = props

  return (
    <Row noGutters v="center" mb="32px">
      {onBack && (
        <Col cw="auto" flexDirection="row">
          <Button
            type="text"
            onClick={onBack}
            icon={<Icon name="ArrowLongLeftFilled" size={24} />}
          />
          <Divider type="vertical" mr="20px" ml="8px" height="auto" />
        </Col>
      )}

      <Col>
        <Title level={3} clamp="1" {...titleProps}>
          {title}
        </Title>
        <Text {...subtitleProps}>{subtitle}</Text>
      </Col>

      {actions && <Col cw="auto">{actions}</Col>}
    </Row>
  )
}

PageHeader.propTypes = {
  onBack: PropTypes.func,
  title: PropTypes.string,
  titleProps: PropTypes.object,
  subtitle: PropTypes.string,
  subtitleProps: PropTypes.object,
  actions: PropTypes.node
}

export default PageHeader
