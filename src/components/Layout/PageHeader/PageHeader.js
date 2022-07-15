import { Button, Col, Divider, Row, Text, Title } from '@qonsoll/react-design'

import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import React from 'react'

function PageHeader(props) {
  const { title, titleProps, subtitle, subtitleProps, onBack, actions } = props

  // [ADDITIONAL HOOKS]

  // const { onFormShow } = useActionsFunctionsContext()
  // const { onFormResultsShow } = useActionsFunctionsContext()

  // [CLEAN FUNCTIONS]
  // const onFormShowDisplay = () => {
  //   onFormShow?.(id)
  //   // history.push(formPath)
  // }
  // const onFormResultsDisplay = () => {
  //   onFormResultsShow?.(id)
  //   // history.push(formPath)
  // }
  // const onRestart = () => {
  //   window.location.reload()
  // }

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
  id: PropTypes.string,
  onBack: PropTypes.func,
  title: PropTypes.string,
  smallScreen: PropTypes.bool,
  titleProps: PropTypes.object,
  handlesPreview: PropTypes.bool
}

export default PageHeader
