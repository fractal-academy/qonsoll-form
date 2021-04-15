import React, { useEffect, useState } from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { Col, Row } from '@qonsoll/react-design'
import { Text } from 'antd-styled'
import { IconLabel } from 'components'
import { globalStyles } from 'app/styles'

const { Dragger } = Upload

const config = {
  name: 'file',
  multiple: true
}

const UploadArea = (props) => {
  const { ...rest } = props

  // [CLEAN FUNCTIONS]
  const onChange = () => {}

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
    <Row>
      <Col>
        <Dragger {...rest} {...config} onChange={onChange}>
          <Row h="center" v="center">
            <Col cw="auto">
              <IconLabel size="medium">
                <InboxOutlined
                  style={globalStyles.iconSize}
                  className="animate__animated  animate__zoomIn"
                />
              </IconLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text>Click or drag file to this area to upload</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text type="secondary">Upload files</Text>
            </Col>
          </Row>
        </Dragger>
      </Col>
    </Row>
  )
}

UploadArea.propTypes = {}

export default UploadArea
