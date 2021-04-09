import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from '@qonsoll/react-design'
import { Button, Divider, Tooltip, Typography } from 'antd'
import {
  ArrowLeftOutlined,
  EyeOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'

// import { useTranslation } from 'react-i18next'
const { Title } = Typography

function PageHeader(props) {
  const { title } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const history = useHistory()
  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  return (
    <Container>
      <Row pt={4} px={45} noGutters>
        <Col cw="auto" p={0} v="center">
          <Button
            size="small"
            type="text"
            style={{
              padding: 0
            }}
            icon={<ArrowLeftOutlined style={{ fontSize: '18px' }} />}
            onClick={() => history.goBack()}
          />
        </Col>
        <Col cw="auto" p={0} v="center">
          <Divider type="vertical" style={{ height: '24px' }} />
        </Col>
        <Col p={0} v="center">
          <Title style={{ marginBottom: 0 }} level={3}>
            {title}
          </Title>
        </Col>
        <Col cw="auto" v="center">
          <Tooltip placement="left" title={'Preview'}>
            <EyeOutlined style={{ fontSize: '20px' }} />
          </Tooltip>
        </Col>
      </Row>
    </Container>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PageHeader
