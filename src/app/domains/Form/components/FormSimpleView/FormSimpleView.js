import { Card, Image, Typography, Dropdown, Menu } from 'antd'
import React, { useEffect, useState, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { generatePath, useHistory } from 'react-router-dom'
import { MoreOutlined } from '@ant-design/icons'
import { styles } from './FormSimpleView.style'
import { Row, Col } from '@qonsoll/react-design'
import { ROUTES_PATHS } from 'app/constants'
// import { useTranslation } from 'react-i18next'
const { Meta } = Card

const { Text } = Typography

function FormSimpleView(props) {
  const { imageURL, title, subtitle, data, withRedirect } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const history = useHistory()
  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  const menu = (
    <Menu>
      <Menu.Item>Rename</Menu.Item>
      <Menu.Item>Delete</Menu.Item>
    </Menu>
  )
  // [CLEAN FUNCTIONS]
  const onFormItemClick = () => {
    history.push(ROUTES_PATHS.FORM_EDIT)
  }
  const onItemSelect = () => {}
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
    <Card
      style={styles.cardStyles}
      bodyStyle={styles.cardBodyPadding}
      cover={
        <Image
          style={styles.imageStyle}
          alt="Form view"
          src={imageURL}
          preview={false}
        />
      }
      onClick={withRedirect ? onFormItemClick : onItemSelect}>
      <Meta
        description={
          <>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Text style={styles.titleStyle} ellipsis>
                      {title}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text style={styles.descriptionTextSize} ellipsis>
                      {subtitle}
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col cw="auto" v="center">
                <Dropdown overlay={menu} placement="bottomRight">
                  {cloneElement(<MoreOutlined />, {
                    className: 'dropdownIcon'
                  })}
                </Dropdown>
              </Col>
            </Row>
          </>
        }
      />
    </Card>
  )
}
FormSimpleView.defaultProps = {}
FormSimpleView.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default FormSimpleView
