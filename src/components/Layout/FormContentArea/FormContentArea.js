import React from 'react'
import { Row, Col } from '@qonsoll/react-design'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { styles } from './FormContentArea.styles'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'

function FormContentArea(props) {
  const { children, leftSideMenu } = props

  // [CUSTOM_HOOKS]
  // const {onFormCancel, onFormCreate} = useActionsFunctionsContext()
  // [ADDITIONAL HOOKS]
  // const history = useHistory()

  // [CLEAN FUNCTIONS]
  const onCancel = () => {
    //onFormCancel?.()
    // history.push(routes?.ALL)
  }
  const onCreateForm = () => {
    //onFormCreate?.()
    // history.push(routes?.ALL)
  }

  return (
    <>
      <Row noGutters {...styles.contentRow}>
        <Col cw="auto" mr={3}>
          {leftSideMenu}
        </Col>
        <Col {...styles.contentCol}>{children}</Col>
      </Row>
      {/* <Row noGutters {...styles.footerButtons}>
        <Col cw="auto" mr={3}>
          <Button type="text" onClick={onCancel}>
            Cancel
          </Button>
        </Col>
        <Col cw="auto">
          <Button type="primary" onClick={onCreateForm}>
            Create form
          </Button>
        </Col>
      </Row> */}
    </>
  )
}

FormContentArea.propTypes = {
  leftSideMenu: PropTypes.node,
  children: PropTypes.node
}

export default FormContentArea
