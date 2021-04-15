import React, { cloneElement, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'app/components'
import './QuestionSimpleView.styles.css'
import { Dropdown, Menu } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import { MoreOutlined } from '@ant-design/icons'
// import { useTranslation } from 'react-i18next'

function QuestionSimpleView(props) {
  const { description, number, icon } = props

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

  const menu = (
    <Menu>
      <Menu.Item>Duplicate</Menu.Item>
      <Menu.Item>Delete</Menu.Item>
    </Menu>
  )

  return (
    <Box mb={3}>
      <Card number={number}>
        <Row h="around" v="center" noGutters ml={2}>
          <Col cw="auto" mr={2}>
            <Box
              display="flex"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }}>
              {cloneElement(icon, { style: { fontSize: '20px' } })}
            </Box>
          </Col>
          <Col width="120px" className="description">
            {description}
          </Col>
          <Col cw="auto">
            <Dropdown overlay={menu} placement="bottomRight">
              <MoreOutlined style={{ fontSize: '26px' }} />
            </Dropdown>
          </Col>
        </Row>
      </Card>
    </Box>
  )
}

QuestionSimpleView.propTypes = {
  number: PropTypes.number.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node
}

export default QuestionSimpleView
