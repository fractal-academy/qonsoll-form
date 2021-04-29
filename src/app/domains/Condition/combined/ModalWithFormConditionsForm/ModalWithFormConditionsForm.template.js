import React, { useEffect, useState } from 'react'
import { Modal, Button, Typography } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import { globalStyles } from 'app/styles'
import { styles } from './ModalWithFormConditionsForm.styles'
import PropTypes from 'prop-types'
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
  const resetLogic = () => {}
  const onSave = () => {
    setIsModalVisible(!isModalVisible)
  }
  const onCancel = () => {
    setIsModalVisible(!isModalVisible)
  }

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
        centered
        okText="Save"
        cancelButtonProps={{ type: 'text' }}
        onOk={onSave}
        onCancel={onCancel}
        closable={false}
        width="1024px"
        bodyStyle={styles.modalBodyStyle}
        title={
          <>
            <Row mb={1} v="center">
              <Col>
                <Title level={3} style={globalStyles.resetMargin}>
                  Logic jumps
                </Title>
              </Col>
              <Col cw="auto" v="center">
                <Button type="text" onClick={resetLogic}>
                  Reset logic
                </Button>
              </Col>
            </Row>
            <Row>
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
  data: PropTypes.array,
  btnProps: PropTypes.object.isRequired,
  children: PropTypes.node
}

export default ModalWithFormConditionsForm
