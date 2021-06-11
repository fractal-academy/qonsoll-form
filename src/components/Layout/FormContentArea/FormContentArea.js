import React from 'react'
import { Row, Col } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { ContentCol, styles } from './FormContentArea.styles'

function FormContentArea(props) {
  const { children, leftSideMenu } = props

  // [CUSTOM_HOOKS]
  // const {onFormCancel, onFormCreate} = useActionsFunctionsContext()
  // [ADDITIONAL HOOKS]
  // const history = useHistory()

  // [CLEAN FUNCTIONS]
  // const onCancel = () => {
  //   //onFormCancel?.()
  //   // history.push(routes?.ALL)
  // }
  // const onCreateForm = () => {
  //   //onFormCreate?.()
  //   // history.push(routes?.ALL)
  // }

  return (
    <>
      <Row noGutters {...styles.contentRow}>
        <Col cw="auto" mr={3}>
          {leftSideMenu}
        </Col>
        <ContentCol>{children}</ContentCol>
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
