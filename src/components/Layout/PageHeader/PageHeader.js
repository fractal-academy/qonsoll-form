import React from 'react'
import PropTypes from 'prop-types'
import { globalStyles } from '../../../../styles'
import { styles } from './PageHeader.styles'
import { Button, Divider, Typography } from 'antd'
import { Row, Col, Container } from '@qonsoll/react-design'
import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'

const { Title } = Typography

function PageHeader(props) {
  const { title, id, onBack } = props

  // [ADDITIONAL HOOKS]
  const { onFormShow } = useActionsFunctionsContext()

  // [CLEAN FUNCTIONS]
  const onFormShowDisplay = () => {
    onFormShow?.(id)
    // history.push(formPath)
  }

  return (
    <Container>
      <Row pt={4} px={45} noGutters>
        {onBack && (
          <>
            <Col cw="auto" p={0} v="center">
              <Button
                size="small"
                type="text"
                style={globalStyles.resetPadding}
                icon={<ArrowLeftOutlined style={globalStyles.iconSize} />}
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
        <Col cw="auto" v="center">
          <Button
            type="text"
            shape="circle"
            icon={<EyeOutlined style={globalStyles.iconSize} />}
            onClick={onFormShowDisplay}
          />
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
