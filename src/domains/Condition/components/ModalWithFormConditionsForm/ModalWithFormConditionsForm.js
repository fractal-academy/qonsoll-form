import { Button, Col, Row, Title } from '@qonsoll/react-design'
import { Modal, Popconfirm, Tooltip } from 'antd'

import PropTypes from 'prop-types'
import React from 'react'
import { useState } from 'react'
import { useTranslations } from '@qonsoll/translation'

function ModalWithFormConditionsForm(props) {
  const { btnProps, children, onResetClick, popconfirmReset } = props

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [CLEAN FUNCTIONS]
  const onSave = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <>
      <Tooltip placement="bottomRight" title={t('Configure logic jumps')}>
        <Button
          ml="8px"
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
            {t('Close')}
          </Button>
        }
        title={
          <>
            <Row v="center" noGutters>
              <Col>
                <Title
                  color="var(--qf-typography-title-color)"
                  fontFamily="var(--ql-font-family-main)"
                  level={3}>
                  {t('Logic')}
                </Title>
              </Col>
              <Col cw="auto" v="center">
                <Popconfirm
                  title={
                    popconfirmReset ||
                    t('Are you sure you want to reset logic?')
                  }
                  okType="danger"
                  okText={t('Reset')}
                  cancelText={t('Cancel')}
                  onConfirm={onResetClick}>
                  <Button type="text" onMouseDown={(e) => e.preventDefault()}>
                    {t('Reset logic')}
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
