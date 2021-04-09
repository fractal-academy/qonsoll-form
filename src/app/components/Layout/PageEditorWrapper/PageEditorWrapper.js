import React, { useEffect, useState } from 'react'
import { Menu, Typography } from 'antd'
import {
  PicCenterOutlined,
  PicRightOutlined,
  PicLeftOutlined,
  AlignLeftOutlined,
  ProfileFilled
} from '@ant-design/icons'
import { Box, Row, Col } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { Content } from 'antd-styled'
import './PageEditorWrapper.style.css'
// import { useTranslation } from 'react-i18next'

const menuMap = [
  { icon: <AlignLeftOutlined /> },
  { icon: <PicCenterOutlined /> },
  { icon: <PicLeftOutlined /> },
  { icon: <PicRightOutlined /> },
  { icon: <ProfileFilled /> }
]

function PageEditorWrapper(props) {
  const { children } = props
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
    <Box display="flex" height="100%" px={45} py={4}>
      <Row>
        <Col cw="auto" pr={2}>
          <Menu
            style={{
              background: 'transparent',
              backgroundColor: '#e2e6ec',
              borderRadius: '8px'
            }}
            defaultSelectedKeys={['1']}
            // selectedKeys={}
          >
            {menuMap.map((item, index) => (
              <Menu.Item
                key={index + 1}
                icon={item.icon}
                onClick={(data) => {
                  console.log(data)
                }}
                style={{
                  borderRadius: '8px',
                  padding: '8px',
                  margin: '2px',
                  display: 'flex',
                  alignContent: 'center',
                  alignItems: 'center'
                }}
              />
            ))}
          </Menu>
        </Col>
      </Row>
      <Content
        backgroundColor="white"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
          borderRadius: '10px'
        }}
        className="custom-scroll">
        {children}
      </Content>
    </Box>
  )
}

PageEditorWrapper.propTypes = {
  children: PropTypes.node
}

export default PageEditorWrapper
