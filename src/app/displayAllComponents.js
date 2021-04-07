import React from 'react'
import { Menu } from 'antd'
import { Col, Container, Row } from '@qonsoll/react-design'
import { Popover, TextAreaForm } from 'components'
import { PlusOutlined } from '@ant-design/icons'

const DisplayAllComponents = (props) => {
  //
  // const textAreaProps = {}
  const btnProps = {
    icon: <PlusOutlined />,
    children: 'This is TextAreaForm',
    type: 'primary',
    size: 'large'
  }
  const content = (
    <Menu>
      <Menu.Item>Item 1</Menu.Item>
      <Menu.Item>Item 2</Menu.Item>
      <Menu.Item>Item 3</Menu.Item>
    </Menu>
  )

  return (
    <Container>
      <Col>
        <Row mb={2} style={{ backgroundColor: '#ece8e8' }}>
          <TextAreaForm
            longText
            noBorder
            btnProps={btnProps}
            // textAreaProps={textAreaProps}
          />
        </Row>
        <Row>
          <Popover
            trigger="click"
            placement="bottomRight"
            btnText="This is Popover"
            btnType="primary"
            content={content}
            btnIcon=<PlusOutlined />
          />
        </Row>
      </Col>
    </Container>
  )
}

export default DisplayAllComponents
