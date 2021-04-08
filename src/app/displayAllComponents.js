import React from 'react'
import { Menu } from 'antd'
import { Col, Container, Row } from '@qonsoll/react-design'
import { Popover, Rate, TextAreaForm } from 'components'
import {
  CaretUpOutlined,
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons'
import Title from 'antd/lib/typography/Title'
import { QuestionTypeView } from 'domains/QuestionType/components'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'

const DisplayAllComponents = (props) => {
  //
  // const textAreaProps = {}
  const btnProps = {
    icon: <CaretUpOutlined />,
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
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

  return (
    <Container>
      <Col>
        <Row mb={4}>
          <TextAreaForm longText noBorder btnProps={btnProps} />
        </Row>
        <Row mb={4}></Row>
        <Row mb={2}>
          <Rate count="4" tooltips={desc} />
          <Title> ^ This is Rating - Rate Component</Title>
        </Row>
        <Row>
          <Popover
            content={<QuestionTypeSelect />}
            btnText={<SettingOutlined style={{ fontSize: '20px' }} />}
            btnType="primary"
            trigger="click"
            placement="bottomRight"
            style={{ padding: '0' }}
          />
        </Row>
      </Col>
    </Container>
  )
}

export default DisplayAllComponents
