import {
  ArrowLeftOutlined,
  EyeOutlined,
  ReadOutlined,
  ReloadOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import { Button, Col, Divider, Row, Title } from '@qonsoll/react-design'

import PropTypes from 'prop-types'
import React from 'react'
import { TEXTINGS } from '../../../constants'
import { Tooltip } from 'antd'
import { styles } from './PageHeader.styles'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'
import { useTranslation } from '../../../context/Translation'

function PageHeader(props) {
  const {
    id,
    title,
    onBack,
    titleProps,
    smallScreen,
    showAnswers,
    handlesPreview,
    isDrawerOpened,
    setDraverOpened
  } = props

  // [ADDITIONAL HOOKS]
  const { formViewTooltip, answerViewTooltip, showDrawerTooltip } =
    useTranslation()
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
  const handleDrawerOpen = () => {
    setDraverOpened(!isDrawerOpened)
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
          level={2}
          color="var(--qf-typography-title-color)"
          fontSize="var(--qf-typography-fs-title)"
          {...titleProps}>
          {title}
        </Title>
      </Col>

      {showAnswers && (
        <Col cw="auto" v="center" mr={1}>
          {smallScreen && (
            <Tooltip
              placement="bottom"
              title={answerViewTooltip || TEXTINGS.answerViewTooltip}>
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
          <Tooltip
            placement="bottom"
            title={formViewTooltip || TEXTINGS.formViewTooltip}>
            <Button
              mr={setDraverOpened && 1}
              type="text"
              icon={<EyeOutlined />}
              onClick={onFormShowDisplay}
            />
          </Tooltip>
        </Col>
      )}
      {title && (
        <Col cw="auto" v="center">
          {smallScreen && (
            <Tooltip
              placement="bottom"
              title={showDrawerTooltip || TEXTINGS.showDrawerTooltip}>
              <Button
                display={['flex', 'flex', 'flex', 'none']}
                type="text"
                icon={<UnorderedListOutlined />}
                onClick={handleDrawerOpen}
              />
            </Tooltip>
          )}
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
  title: PropTypes.string,
  smallScreen: PropTypes.bool,
  titleProps: PropTypes.object,
  handlesPreview: PropTypes.bool
}

export default PageHeader
