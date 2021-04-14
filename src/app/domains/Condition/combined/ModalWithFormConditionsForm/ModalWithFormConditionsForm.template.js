import React, { useEffect, useState } from 'react'
import { Modal, Button, Typography, Divider } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import {} from '@ant-design/icons'
import { globalStyles } from 'app/styles'
import PropTypes from 'prop-types'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography

function ModalWithFormConditionsForm(props) {
  const { data, btnProps, children } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
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
    <>
      <Button
        {...btnProps}
        onClick={() => {
          setIsModalVisible(!isModalVisible)
        }}
      />
      <Modal
        visible={isModalVisible}
        okText="Save"
        cancelButtonProps={{ type: 'text' }}
        closable={false}
        width="750px"
        title={
          <>
            <Row mb={1} v="center">
              <Col>
                <Title level={3} style={globalStyles.resetMargin}>
                  Logic jumps
                </Title>
              </Col>
              <Col cw="auto" v="center">
                <Button type="text">Reset logic</Button>
              </Col>
            </Row>
            <Row pb={25}>
              <Col>
                <Text>Here should be description</Text>
              </Col>
            </Row>
          </>
        }>
        {children}
      </Modal>
    </>
  )
}
ModalWithFormConditionsForm.defaultProps = {
  btnProps: { children: 'Pass btn text as child' }
}
ModalWithFormConditionsForm.propTypes = {
  btnProps: PropTypes.object.isRequired,
  children: PropTypes.node
}

export default ModalWithFormConditionsForm
