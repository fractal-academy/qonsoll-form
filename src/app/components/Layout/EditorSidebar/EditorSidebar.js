import React, { Children, useEffect, useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Menu, Typography, Divider } from 'antd'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'
import { Popover } from 'components'
// import { useTranslation } from 'react-i18next'

const { SubMenu } = Menu
const { Text, Title } = Typography

function EditorSidebar(props) {
  const { questionsList, questionsEndingsList } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

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
    <Box
      bg="white"
      width="220px"
      display="flex"
      flex={1}
      flexDirection="column">
      <Box p={3}>
        <Row display="flex" flex={1}>
          <Col v="center">
            <Title level={5} id="logo1" style={{ margin: 0 }}>
              Questions
            </Title>
          </Col>
          <Col
            cw="auto"
            px={10}
            py={1}
            mr={2}
            borderRadius="5px" /*bg="#e8f0fb"*/
          >
            <Popover
              trigger={'click'}
              placement={'bottomRight'}
              btnType="ghost"
              btnIcon={<PlusOutlined />}
              content={<QuestionTypeSelect />}
            />

            {/*<PlusOutlined style={{ color: '#1d6fdc' }} />*/}
          </Col>
          <Col cw="auto" px={1} borderRadius="5px" v="center">
            <SettingOutlined />
          </Col>
        </Row>
      </Box>
      <Box overflow="auto" p={3}>
        {questionsList}
      </Box>
      <Box mt="auto" style={{ marginTop: 'auto' }}>
        <Row>
          <Col>
            <Divider type="horizontal" style={{ margin: 0 }} />
          </Col>
        </Row>
        <Row h="center" mt={1} style={{ cursor: 'grab' }}>
          <Col cw="auto">
            <Box height="3px" bg="#282c34" width="50px" borderRadius="8px" />
          </Col>
        </Row>
        <Row p={3}>
          <Col v="center">
            <Title level={5} id="logo1" style={{ margin: 0 }}>
              Endings
            </Title>
          </Col>
          <Col cw="auto" px={10} py={1} borderRadius="5px" bg="#e8f0fb">
            <PlusOutlined style={{ color: '#1d6fdc' }} />
          </Col>
        </Row>
        <Row pb={3} px={3}>
          <Col>{questionsEndingsList}</Col>
        </Row>
      </Box>
    </Box>
  )
}

EditorSidebar.defaultProps = {
  questionsList: 'Questions list',
  questionsEndingsList: 'Question endings list'
}

EditorSidebar.propTypes = {
  questionsList: PropTypes.node.isRequired,
  questionsEndingsList: PropTypes.node.isRequired
}

export default EditorSidebar
