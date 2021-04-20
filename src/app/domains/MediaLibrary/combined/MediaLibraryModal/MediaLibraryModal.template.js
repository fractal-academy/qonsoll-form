import React, { useEffect, useState } from 'react'
import { Modal, Button, Typography, Input, Divider } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { FormSimpleView } from 'domains/Form/components'
import { globalStyles } from 'app/styles'
import { styles } from './MediaLibraryModal.styles'
import PropTypes from 'prop-types'
import './MediaLibraryModal.styles.css'
import { MediaLibraryFilter } from 'domains/MediaLibrary/components'
// import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography

function MediaLibraryModal(props) {
  const { data, btnProps } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [switchState, setSwitchState] = useState(true)
  const [sidebarState, setSidebarState] = useState(true)

  // [COMPUTED PROPERTIES]
  let amountFiles = 0
  // [CLEAN FUNCTIONS]
  const onModalContinue = () => {
    setIsModalVisible(!isModalVisible)
  }
  const onModalCancel = () => {
    setIsModalVisible(!isModalVisible)
  }
  const onFilterButtonClick = () => {
    setSidebarState(!sidebarState)
  }
  const onApplyFilter = () => {
    setSidebarState(!sidebarState)
  }
  const onCancelFilter = () => {
    setSidebarState(!sidebarState)
  }
  const onSwitchChange = () => {
    setSwitchState(!switchState)
  }
  const modalStateChange = () => {
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
      <Button {...btnProps} onClick={modalStateChange} />
      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        width="750px"
        bodyStyle={globalStyles.resetPadding}>
        <Row>
          <Col>
            <Row mb={1} v="center" px={3} pt={3}>
              <Col>
                <Title
                  level={3}
                  style={(styles.boldFont, globalStyles.resetMargin)}>
                  Media Library
                </Title>
              </Col>
              <Col cw="auto" v="center">
                <Box bg="#eceff5" p={1} borderRadius="4px">
                  <Button
                    size="small"
                    type={switchState ? 'text' : 'secondary'}
                    //can`t move style to separate file because of state dependency
                    style={{
                      borderRadius: '4px',
                      border: 0,
                      color: switchState ? '#82868c' : '#1d6fdc'
                    }}
                    onClick={onSwitchChange}>
                    Image
                  </Button>
                  <Button
                    size="small"
                    type={!switchState ? 'text' : 'secondary'}
                    //same here
                    style={{
                      borderRadius: '4px',
                      border: 0,
                      color: !switchState ? '#82868c' : '#1d6fdc'
                    }}
                    onClick={onSwitchChange}>
                    Video
                  </Button>
                </Box>
              </Col>
            </Row>
            <Row pb={25} px={3}>
              <Col>
                <Text style={styles.textSecondary}>
                  You have {amountFiles} files.
                </Text>
              </Col>
            </Row>
            <Row px={3} pb={3}>
              <Col>
                <Input
                  prefix={<SearchOutlined />}
                  style={styles.borderRadius}
                  placeholder="Search media file by name..."
                />
              </Col>
              <Col cw="auto">
                <Divider type="vertical" style={styles.dividerStyles} />
              </Col>
              <Col cw="auto" v="center">
                <Button
                  icon={<FilterOutlined />}
                  type="text"
                  style={styles.borderRadius}
                  onClick={onFilterButtonClick}>
                  Filter
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Divider type="horizontal" style={globalStyles.resetMargin} />
              </Col>
            </Row>
            <Box
              height="330px"
              overflow="auto"
              display="flex"
              flexWrap="wrap"
              flexDirection="row"
              bg="#f6f9fe"
              className="custom-scroll">
              {/* Here should be list of data Images/Video */}
            </Box>
            <Row>
              <Col>
                <Divider type="horizontal" style={globalStyles.resetMargin} />
              </Col>
            </Row>
            <Row h="right" p={3}>
              <Col cw="auto">
                <Button
                  type="text"
                  style={styles.footerButtonStyle}
                  onClick={onModalCancel}>
                  Cancel
                </Button>
              </Col>
              <Col cw="auto">
                <Button
                  type="primary"
                  style={styles.footerButtonStyle}
                  onClick={onModalContinue}>
                  Continue
                </Button>
              </Col>
            </Row>
          </Col>
          {sidebarState && (
            <MediaLibraryFilter
              onApplyFilter={onApplyFilter}
              onCancelFilter={onCancelFilter}
            />
          )}
        </Row>
      </Modal>
    </>
  )
}
MediaLibraryModal.defaultProps = {
  btnProps: { children: 'Open Modal' }
}
MediaLibraryModal.propTypes = {
  btnProps: PropTypes.object.isRequired,
  data: PropTypes.array
}

export default MediaLibraryModal
