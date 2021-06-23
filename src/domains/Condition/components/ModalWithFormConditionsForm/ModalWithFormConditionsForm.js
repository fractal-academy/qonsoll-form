import React from 'react'
import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Typography } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import typeformTheme from '../../../../../styles/theme'
import { ThemeContext } from 'styled-components'
import { useTranslation } from 'feedback-typeform-app/src/context/Translation'

const { Title, Text } = Typography

function ModalWithFormConditionsForm(props) {
  const { btnProps, children, onResetClick } = props
  const theme = useContext(ThemeContext)
  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)

  // [ADDITIONAL_HOOKS]
  const { modalTitle, modalResetLogic, submitBtn, cancelBtn } = useTranslation()

  // [CLEAN FUNCTIONS]
  const onSave = () => {
    setIsModalVisible(!isModalVisible)
  }
  const onCancel = () => {
    setIsModalVisible(!isModalVisible)
  }

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
        okText={submitBtn || 'Save'}
        cancelText={cancelBtn || 'Cancel'}
        cancelButtonProps={{ type: 'text' }}
        onOk={onSave}
        onCancel={onCancel}
        closable={false}
        width="1024px"
        bodyStyle={{
          paddingTop: '0',
          height: '70vh',
          overflow: 'auto',
          backgroundColor:
            theme.color.primary.t.lighten9 ||
            typeformTheme.color.primary.t.lighten9
        }}
        title={
          <>
            <Row v="center">
              <Col>
                <Title level={3}>{modalTitle || 'Logic'}</Title>
              </Col>
              <Col cw="auto" v="center">
                <Button type="text" onClick={onResetClick}>
                  {modalResetLogic || 'Reset logic'}
                </Button>
              </Col>
            </Row>
          </>
        }>
        {children}
      </Modal>
    </>
  )
}

ModalWithFormConditionsForm.propTypes = {
  btnProps: PropTypes.object.isRequired,
  children: PropTypes.node
}

export default ModalWithFormConditionsForm
