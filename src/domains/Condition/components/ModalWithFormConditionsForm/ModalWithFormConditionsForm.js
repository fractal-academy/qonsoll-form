import React from 'react'
import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Typography, Popconfirm, Tooltip } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import typeformTheme from '../../../../../styles/theme'
import { ThemeContext } from 'styled-components'
import { useTranslation } from '../../../../context/Translation'

const { Title } = Typography

function ModalWithFormConditionsForm(props) {
  const { btnProps, children, onResetClick, popconfirmReset } = props
  const theme = useContext(ThemeContext)
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
          backgroundColor:
            theme.color.primary.t.lighten9 ||
            typeformTheme.color.primary.t.lighten9
        }}
        footer={
          <Button type="primary" onClick={onSave}>
            {submitBtn || 'Continue'}
          </Button>
        }
        title={
          <>
            <Row v="center" noGutters>
              <Col>
                <Title level={3}>{modalTitle || 'Logic'}</Title>
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
