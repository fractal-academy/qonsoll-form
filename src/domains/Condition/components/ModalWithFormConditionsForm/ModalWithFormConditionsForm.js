import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm, Tooltip } from 'antd'
import { Row, Col, Button, Title } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'

function ModalWithFormConditionsForm(props) {
  const { btnProps, children, onResetClick, popconfirmReset } = props

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)

  // [ADDITIONAL_HOOKS]
  const { modalTitle, modalResetLogic, submitBtn, conditionsFormTooltip } =
    useTranslation()

  // [CLEAN FUNCTIONS]
  const onSave = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <>
      <Tooltip
        placement="bottomRight"
        title={conditionsFormTooltip || 'Configure logic jumps'}>
        <Button
          {...btnProps}
          onClick={() => {
            setIsModalVisible(!isModalVisible)
          }}
          onMouseDown={(e) => e.preventDefault()}
        />
      </Tooltip>
      <Modal
        centered
        onOk={onSave}
        closable={false}
        visible={isModalVisible}
        width="1024px"
        bodyStyle={{
          paddingTop: '8px',
          height: '70vh',
          overflow: 'auto',
          backgroundColor: 'var(--ql-body-bg)'
        }}
        footer={
          <Button type="primary" onClick={onSave}>
            {submitBtn || 'Close'}
          </Button>
        }
        title={
          <>
            <Row v="center" noGutters>
              <Col>
                <Title color="var(--qf-typography-title-color)" level={3}>
                  {modalTitle || 'Logic'}
                </Title>
              </Col>
              <Col cw="auto" v="center">
                <Popconfirm
                  title={
                    popconfirmReset ||
                    'Are you sure, you want to reset logic jumps?'
                  }
                  okText="Reset"
                  okType="danger"
                  onConfirm={onResetClick}>
                  <Button type="text" onMouseDown={(e) => e.preventDefault()}>
                    {modalResetLogic || 'Reset logic'}
                  </Button>
                </Popconfirm>
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
  children: PropTypes.node,
  btnProps: PropTypes.object,
  onResetClick: PropTypes.func,
  popconfirmReset: PropTypes.bool
}

export default ModalWithFormConditionsForm
