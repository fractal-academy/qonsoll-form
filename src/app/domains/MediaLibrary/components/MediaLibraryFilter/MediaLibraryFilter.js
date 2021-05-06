import { useState } from 'react'
import PropTypes from 'prop-types'
import { globalStyles } from 'app/styles'
import { ReloadOutlined } from '@ant-design/icons'
import { styles } from './MediaLibraryFilter.styles'
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
    <Box bg="white" width="220px" display="flex" flexDirection="column" p={3}>
      <Box>
        <Row pb={4}>
          <Col v="center">
            <Title level={5} style={globalStyles.resetMargin}>
              Filter
            </Title>
          </Col>
          <Col cw="auto" borderRadius="4px">
            <Button type="text" onClick={resetFilters}>
              Reset filters
            </Button>
          </Col>
        </Row>
      </Box>
      <Row pb={2}>
        <Col v="center">
          <Text style={styles.subtitleStyle}>PHASE</Text>
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
      <Row>
        <Col v="center">
          <Checkbox.Group onChange={onPhaseCheckboxChange}>
            {phaseOptions.map((option, index) => (
              <Row key={index}>
                <Col>
                  <Checkbox value={option.value}>{option.label}</Checkbox>
                </Col>
              </Row>
            ))}
          </Checkbox.Group>
        </Col>
      </Row>
      <Row>
        <Col v="center">
          <Divider type="horizontal" />
        </Col>
      </Row>
      <Row pb={2}>
        <Col>
          <Text style={styles.subtitleStyle}>AUDIENCE</Text>
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
              <Row key={index}>
                <Col>
                  <Checkbox value={option.value}>{option.label}</Checkbox>
                </Col>
              </Row>
            ))}
          </Checkbox.Group>
        </Col>
      </Row>
      <Row>
        <Col v="center">
          <Divider type="horizontal" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type="primary"
            style={styles.siderButtonsStyle}
            onClick={onApplyFilter}>
            Apply filter
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type="text"
            style={styles.siderButtonsStyle}
            onClick={onCancelFilter}>
            Cancel
          </Button>
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
