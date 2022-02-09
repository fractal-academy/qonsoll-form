import {
  ArrowLeftOutlined,
  EyeOutlined,
  ReadOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import { Button, Col, Divider, Row, Title } from '@qonsoll/react-design'

import PropTypes from 'prop-types'
import React from 'react'
import { TEXTINGS } from '../../../constants'
import { Tooltip } from 'antd'
import styled from 'styled-components'
import { styles } from './PageHeader.styles'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'
import { useTranslation } from '../../../context/Translation'

const StyledTitle = styled(Title)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-break: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`
function PageHeader(props) {
  const {
    id,
    title,
    onBack,
    titleProps,
    smallScreen,
    showAnswers,
    handlesPreview
  } = props

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
        <StyledTitle
          isElipsis
          level={2}
          color="var(--qf-typography-title-color)"
          fontSize="var(--qf-typography-fs-title)"
          {...titleProps}>
          {title}
        </StyledTitle>
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
  title: PropTypes.string,
  smallScreen: PropTypes.bool,
  titleProps: PropTypes.object,
  handlesPreview: PropTypes.bool
}

export default PageHeader
