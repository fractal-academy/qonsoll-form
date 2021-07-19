import React from 'react'
import PropTypes from 'prop-types'
import { globalStyles } from '../../../../styles'
import { styles } from './PageHeader.styles'
import { Button, Divider, Tooltip, Typography } from 'antd'
import { Row, Col, Container } from '@qonsoll/react-design'
import { ArrowLeftOutlined, EyeOutlined, ReadOutlined } from '@ant-design/icons'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'
import { useTranslation } from '../../../context/Translation'

const { Title } = Typography

function PageHeader(props) {
  const { title, id, onBack, handleSmallScreen } = props

  // [ADDITIONAL HOOKS]
  const { onFormShow } = useActionsFunctionsContext()
  const { onFormResultsShow } = useActionsFunctionsContext()
  const { formPreviewTooltip } = useTranslation()

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
    <Container>
      <Row pt={4} px={45} noGutters>
        {onBack && (
          <>
            <Col cw="auto" p={0} v="center">
              <Button
                type="text"
                shape="default"
                style={globalStyles.resetPadding}
                icon={<ArrowLeftOutlined />}
                onClick={onBack}
              />
            </Col>
            <Col cw="auto" p={0} v="center">
              <Divider type="vertical" style={styles.dividerHeight} />
            </Col>
          </>
        )}

        <Col p={0} v="center">
          <Title style={globalStyles.resetMargin} level={3}>
            {title}
          </Title>
        </Col>
        <Col cw="auto" v="center" mr={1}>
          {handleSmallScreen && (
            <Button
              type="text"
              icon={<ReadOutlined />}
              onClick={onFormResultsDisplay}>
              Results
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
      </Row>
    </Container>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  onBack: PropTypes.func
}

export default PageHeader
