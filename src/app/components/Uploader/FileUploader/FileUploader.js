import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { Col, Row } from '@qonsoll/react-design'
import { Text } from 'antd-styled'
import { IconLabel } from 'components'

const { Dragger } = Upload

const config = {
  name: 'file',
  multiple: true
}

const UploadArea = (props) => {
  const { ...rest } = props

  //write this code for upload files
  const onChange = () => {}
  return (
    <Row>
      <Col>
        <Dragger {...rest} {...config} onChange={onChange}>
          <Row h="center" v="center">
            <Col cw="auto">
              <IconLabel size="medium">
                <InboxOutlined
                  style={{ fontSize: '20px' }}
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
              <Text type={'secondary'}>Upload files</Text>
            </Col>
          </Row>
        </Dragger>
      </Col>
    </Row>
  )
}

UploadArea.propTypes = {}

export default UploadArea
