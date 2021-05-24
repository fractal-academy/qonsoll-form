import { useState } from 'react'
import PropTypes from 'prop-types'
import { ReloadOutlined } from '@ant-design/icons'
import { CustomApplyButton, CustomText } from './MediaLibraryFilter.styles'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Button, Typography, Divider, Checkbox } from 'antd'

const { Text, Title } = Typography

const phaseOptions = [
  { label: 'Welcome stage', value: 'Welcome stage' },
  { label: 'Start', value: 'Start' },
  { label: 'Finish', value: 'Finish' }
]
const audienceOptions = [
  { label: 'Men from 16 to 40', value: 'Men from 16 to 40' },
  { label: 'Women from 30 to 32', value: 'Women from 30 to 32' }
]

function MediaLibraryFilter(props) {
  const { onApplyFilter, onCancelFilter } = props

  // [COMPONENT STATE HOOKS]
  const [audienceFilterValues, setAudienceFilterValues] = useState([])
  const [phaseFilterValues, setPhaseFilterValues] = useState([])

  // [CLEAN FUNCTIONS]
  const resetFilters = () => {
    setAudienceFilterValues([])
    setPhaseFilterValues([])
  }
  const onAudienceCheckboxChange = (data) => {
    setAudienceFilterValues(data)
  }
  const onPhaseCheckboxChange = (data) => {
    setPhaseFilterValues(data)
  }
  const resetPhaseFilter = () => {
    setPhaseFilterValues([])
  }
  const resetAudienceFilter = () => {
    setAudienceFilterValues([])
  }

  return (
    <Box bg="white" width="280px" display="flex" flexDirection="column" px={4}>
      <Box>
        <Row noGutters pb={4}>
          <Col v="center">
            <Title level={5}>Filter</Title>
          </Col>
          <Col cw="auto">
            <Button type="text" onClick={resetFilters}>
              Reset filters
            </Button>
          </Col>
        </Row>
      </Box>
      <Row noGutters pb={2}>
        <Col v="center">
          <CustomText>PHASE</CustomText>
        </Col>
        <Col cw="auto" v="center">
          <Button
            type="text"
            size="small"
            shape="circle"
            icon={<ReloadOutlined />}
            onClick={resetPhaseFilter}
          />
        </Col>
      </Row>
      <Row noGutters>
        <Col v="center">
          <Checkbox.Group onChange={onPhaseCheckboxChange}>
            {phaseOptions.map((option, index) => (
              <Row noGutters key={index} py={1}>
                <Col>
                  <Checkbox value={option.value}>{option.label}</Checkbox>
                </Col>
              </Row>
            ))}
          </Checkbox.Group>
        </Col>
      </Row>
      <Row noGutters my={1}>
        <Col v="center">
          <Divider type="horizontal" />
        </Col>
      </Row>
      <Row noGutters pb={2}>
        <Col>
          <CustomText>AUDIENCE</CustomText>
        </Col>
        <Col cw="auto">
          <Button
            type="text"
            size="small"
            shape="circle"
            icon={<ReloadOutlined />}
            onClick={resetAudienceFilter}
          />
        </Col>
      </Row>
      <Row>
        <Col v="center">
          <Checkbox.Group onChange={onAudienceCheckboxChange}>
            {audienceOptions.map((option, index) => (
              <Row noGutters key={index} py={1}>
                <Col>
                  <Checkbox value={option.value}>{option.label}</Checkbox>
                </Col>
              </Row>
            ))}
          </Checkbox.Group>
        </Col>
      </Row>
      <Row noGutters my={3}>
        <Col v="center">
          <Divider type="horizontal" />
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomApplyButton type="primary" onClick={onApplyFilter}>
            Apply filter
          </CustomApplyButton>
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomApplyButton type="text" onClick={onCancelFilter}>
            Cancel
          </CustomApplyButton>
        </Col>
      </Row>
    </Box>
  )
}

MediaLibraryFilter.propTypes = {
  onApplyFilter: PropTypes.func.isRequired,
  onCancelFilter: PropTypes.func.isRequired
}

export default MediaLibraryFilter
