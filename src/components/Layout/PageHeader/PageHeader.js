import React from 'react'
import { Tooltip } from 'antd'
import PropTypes from 'prop-types'
import { styles } from './PageHeader.styles'
import { globalStyles } from '../../../../styles'
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
  const {
    id,
    title,
    titleProps,
    onBack,
    smallScreen,
    handlesPreview,
    hideResults
  } = props

  // [ADDITIONAL HOOKS]
  const { onFormShow } = useActionsFunctionsContext()
  const { onFormResultsShow } = useActionsFunctionsContext()
  const { formPreviewTooltip, resultButton } = useTranslation()

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

  // [ COMPUTED PROPERTIES ]
  const showResultsRule = !hideResults || (!title && !hideResults)

  return (
    <Row noGutters v="center" mb="var(--qf-header-mb)">
      {onBack && (
        <Col cw="auto" h="center" flexDirection="row">
          <Button
            type="text"
            onClick={onBack}
            icon={<ArrowLeftOutlined />}
            style={globalStyles.resetPadding}
          />
          {title && <Divider type="vertical" style={styles.dividerHeight} />}
        </Col>
      )}
      <Col>
        <Title level={2} {...titleProps}>
          {title}
        </Title>
      </Col>

      {showResultsRule && (
        <Col cw="auto" v="center" mr={1}>
          {smallScreen && (
            <Button
              type="text"
              icon={<ReadOutlined />}
              onClick={onFormResultsDisplay}>
              {resultButton || 'Results'}
            </Button>
          )}
        </Col>
      )}

      {handlesPreview && title && (
        <Col cw="auto" v="center">
          <Tooltip
            placement="bottom"
            title={formPreviewTooltip || 'Form preview'}>
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={onFormShowDisplay}
            />
          </Tooltip>
        </Col>
      )}
      {!title && (
        <Button type="text" icon={<ReloadOutlined />} onClick={onRestart}>
          Restart
        </Button>
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
