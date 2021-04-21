import { Card, Typography, Dropdown, Menu, Popconfirm, message } from 'antd'
import React, { useEffect, useState, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { generatePath, useHistory } from 'react-router-dom'
import { FileOutlined, MoreOutlined } from '@ant-design/icons'
import { styles } from './FormSimpleView.style'
import { Row, Col, Box } from '@qonsoll/react-design'
import { ROUTES_PATHS } from 'app/constants'
import { FormSimpleViewEdit } from 'domains/Form/components'
import { deleteData } from 'app/services/Firestore'
import COLLECTIONS from 'app/constants/collection'
// import { useTranslation } from 'react-i18next'
const { Meta } = Card

const { Text } = Typography

function FormSimpleView(props) {
  const { imageURL, title, subtitle, data, withRedirect, id } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user
  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const history = useHistory()
  // [COMPONENT STATE HOOKS]
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  // [COMPUTED PROPERTIES]
  const handleCancel = () => {
    setVisible(false)
  }

  const showPopconfirm = () => {
    setVisible(true)
  }

  const handleOk = async () => {
    setConfirmLoading(true)
    try {
      await deleteData(COLLECTIONS.FORMS, id)
    } catch (e) {
      message.error("Can't delete form")
    }

    setVisible(false)
    setConfirmLoading(false)
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <FormSimpleViewEdit formData={props} />
      </Menu.Item>
      <Menu.Item>
        <Popconfirm
          title="Delete this form?"
          visible={visible}
          onConfirm={handleOk}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}>
          <Text onClick={showPopconfirm}>Delete</Text>
        </Popconfirm>
      </Menu.Item>
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
        <Box
          height="136px"
          weight="226px"
          display="flex"
          bg="white"
          borderRadius="8px"
          justifyContent="center"
          alignItems="center"
          onClick={onFormItemClick}>
          <FileOutlined style={{ fontSize: '40px', opacity: '.5' }} />
        </Box>
      }>
      <Meta
        description={
          <>
            <Row h="between" mt={3}>
              <Col>
                <Row>
                  <Col>
                    <Text style={styles.titleStyle} ellipsis>
                      {title}
                    </Text>
                  </Col>
                </Row>
                {subtitle && (
                  <Row>
                    <Col>
                      <Text style={styles.descriptionTextSize} ellipsis>
                        {subtitle}
                      </Text>
                    </Col>
                  </Row>
                )}
              </Col>
              <Col cw="auto" v="center">
                <Dropdown
                  overlay={menu}
                  placement="bottomRight"
                  trigger="click">
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
