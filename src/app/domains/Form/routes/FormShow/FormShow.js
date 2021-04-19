import React, { useEffect, useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Button, Divider, Typography } from 'antd'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import { globalStyles } from 'app/styles'
import { MiddleContainer } from '~/app/components'
import { FormAdvancedView } from 'domains/Form/components'
import { QuestionAdvancedView } from '~/app/domains/Question/components'
import { QUESTION_TYPES } from '~/app/constants'
// import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography

function FormShow(props) {
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const history = useHistory()
  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onRestart = () => {}
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
    <Box bg="#f6f9fe" display="flex" flexDirection="column" height="100%">
      <Row py={3} px={4} noGutters bg="white">
        <Col cw="auto" p={0} v="center">
          <Button
            size="small"
            type="text"
            style={globalStyles.resetPadding}
            icon={<ArrowLeftOutlined style={globalStyles.iconSize} />}
            onClick={() => history.goBack()}
          />
        </Col>

        <Col style={{ textAlign: 'center' }}>
          <Title level={5} style={globalStyles.resetMargin}>
            Live Preview
          </Title>
        </Col>
        <Col cw="auto" v="center">
          <Button
            type="text"
            size="small"
            icon={<ReloadOutlined />}
            onClick={onRestart}>
            Restart
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Divider style={globalStyles.resetMargin} />
        </Col>
      </Row>
      <Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
        p={4}
        m={4}
        borderRadius="8px"
        bg="white"
        overflow="auto">
        <FormAdvancedView>
          <QuestionAdvancedView
            question={{ questionType: QUESTION_TYPES.RATING }}
          />
        </FormAdvancedView>
      </Box>
    </Box>
  )
}

FormShow.propTypes = {}

export default FormShow
