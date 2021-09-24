import React from 'react'
import { Tooltip } from 'antd'
import PropTypes from 'prop-types'
import { styles } from './PageHeader.styles'
import { useTranslation } from '../../../context/Translation'
import { Row, Col, Button, Divider, Title } from '@qonsoll/react-design'
import {
  ArrowLeftOutlined,
  EyeOutlined,
  ReadOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'

function PageHeader(props) {
  const { id, title, titleProps, onBack, smallScreen, handlesPreview } = props

  // [ADDITIONAL HOOKS]
  const { formViewTooltip, answerViewTooltip } = useTranslation()
  const { onFormShow } = useActionsFunctionsContext()
  const { onFormResultsShow } = useActionsFunctionsContext()

  // [CLEAN FUNCTIONS]
  const onFormShowDisplay = () => {
    onFormShow?.(id)
    // history.push(formPath)
  }
  const onFormResultsDisplay = () => {
    onFormResultsShow?.(id)
    // history.push(formPath)
  }
  const onRestart = () => {
    window.location.reload()
  }

  return (
    <Row noGutters v="center" mb="var(--qf-header-mb)">
      {onBack && (
        <Col cw="auto" h="center" flexDirection="row">
          <Button type="text" onClick={onBack} icon={<ArrowLeftOutlined />} />
          {title && <Divider type="vertical" style={styles.dividerHeight} />}
        </Col>
      )}
      <Col>
        <Title
          color="var(--qf-typography-title-color)"
          level={2}
          {...titleProps}>
          {title}
        </Title>
      </Col>

      {title && (
        <Col cw="auto" v="center" mr={1}>
          {smallScreen && (
            <Tooltip
              placement="bottom"
              title={answerViewTooltip || 'Answers preview'}>
              <Button
                mr={1}
                type="text"
                icon={<ReadOutlined />}
                onClick={onFormResultsDisplay}
              />
            </Tooltip>
          )}
        </Col>
      )}

      {handlesPreview && title && (
        <Col cw="auto" v="center">
          <Tooltip placement="bottom" title={formViewTooltip || 'Form preview'}>
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={onFormShowDisplay}
            />
          </Tooltip>
        </Col>
      )}
      {!title && (
        <Button type="text" onClick={onRestart} icon={<ReloadOutlined />} />
      )}
    </Row>
  )
}

PageHeader.propTypes = {
  id: PropTypes.string,
  onBack: PropTypes.func,
  smallScreen: PropTypes.bool,
  titleProps: PropTypes.object,
  handlesPreview: PropTypes.bool,
  title: PropTypes.string.isRequired
}

export default PageHeader
