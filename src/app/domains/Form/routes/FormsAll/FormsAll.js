import React, { useEffect, useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import {
  Breadcrumb,
  Button,
  Divider,
  Tooltip,
  Typography,
  Menu,
  Input
} from 'antd'
import {
  ArrowLeftOutlined,
  FolderOutlined,
  SettingOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useHistory } from 'react-router'
import { globalStyles } from 'app/styles'
import { styles } from './FormsAll.styles'
import { Link } from 'react-router-dom'
import { FormSimpleView } from 'domains/Form/components'
// import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography

const mockRoutes = [
  { path: '/forms', page: 'Forms' },
  { path: '/images', page: 'Images' },
  { path: '/videos', page: 'Videos' }
]

function FormsAll(props) {
  //const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const history = useHistory()
  // [COMPONENT STATE HOOKS]
  const [formsList, setFormsList] = useState([])

  // [COMPUTED PROPERTIES]
  let amountFiles = 0
  // [CLEAN FUNCTIONS]
  const onFilterButtonClick = () => {}
  const onAddForm = () => {
    setFormsList((prev) => [
      ...prev,
      {
        title: 'new Title ',
        subtitle: 'subtitle'
      }
    ])
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
  const menu = (
    <Menu>
      {mockRoutes.map((item, index) => (
        <Menu.Item key={index}>
          {/* <Link to={item.path}>{item.page}</Link> */}
          <Text>{item.page}</Text>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Box bg="#f6f9fe" flexDirection="column" px={45} py={4} minHeight="100%">
      {/* Page Header */}
      <Row noGutters display="flex">
        <Col cw="auto" p={0} v="center">
          <Button
            size="small"
            type="text"
            style={globalStyles.resetPadding}
            icon={<ArrowLeftOutlined style={globalStyles.iconSize} />}
            onClick={() => history.goBack()}
          />
        </Col>
        <Col cw="auto" p={0} v="center">
          <Divider type="vertical" style={styles.dividerHeight} />
        </Col>
        <Col p={0} v="center">
          <Breadcrumb>
            <Breadcrumb.Item>
              <FolderOutlined />
              <Text>Folder</Text>
            </Breadcrumb.Item>
            <Breadcrumb.Item overlay={menu}>
              <Text>Forms</Text>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      {/* SecondaryTitle */}
      <Row mb={1} v="center" pt={3}>
        <Col>
          <Title level={2} style={(styles.boldFont, globalStyles.resetMargin)}>
            Forms
          </Title>
        </Col>
      </Row>
      <Row pb={25}>
        <Col>
          <Text style={styles.textSecondary}>
            You have {amountFiles} folders/files.
          </Text>
        </Col>
      </Row>
      <Row pb={3}>
        <Col>
          <Input
            prefix={<SearchOutlined />}
            style={styles.borderRadius}
            placeholder="Search folder/file by name..."
          />
        </Col>
      </Row>
      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        bg="#f6f9fe"
        className="custom-scroll">
        {/* Here should be list of data Images/Video */}
        {formsList.map((item) => (
          <Box mr={3} mb={3}>
            <FormSimpleView
              key={item}
              title={item.title}
              subtitle={item.subtitle}
              redirect
            />
          </Box>
        ))}
        <Box
          bg="#eceff5"
          mr={3}
          mb={3}
          borderRadius="8px"
          width="150px"
          height="150px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={globalStyles.cursorPointer}
          onClick={onAddForm}>
          <PlusOutlined />
        </Box>
      </Box>
    </Box>
  )
}

FormsAll.propTypes = {}

export default FormsAll
