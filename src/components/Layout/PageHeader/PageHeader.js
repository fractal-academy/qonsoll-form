import React from 'react'
import PropTypes from 'prop-types'
import { styles } from './PageHeader.styles'
import { globalStyles } from '../../../../styles'
import { Row, Col } from '@qonsoll/react-design'
import { Button, Divider, Tooltip, Typography } from 'antd'
import { useTranslation } from '../../../context/Translation'
import { ArrowLeftOutlined, EyeOutlined, ReadOutlined } from '@ant-design/icons'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'

const { Title } = Typography

function PageHeader(props) {
  const { id, title, titleProps, onBack, smallScreen, handlesPreview } = props

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

  return (
    <Row noGutters v="center">
      {onBack && (
        <Col cw="auto" h="center" flexDirection="row">
          <Button
            type="text"
            onClick={onBack}
            icon={<ArrowLeftOutlined />}
            style={globalStyles.resetPadding}
          />
          <Divider type="vertical" style={styles.dividerHeight} />
        </Col>
      )}
      <Col>
        <Title level={2} {...titleProps}>
          {title}
        </Title>
      </Col>
      {handlesPreview && (
        <>
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
        </>
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
