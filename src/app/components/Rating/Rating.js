import React, { useEffect, useState } from 'react'
import { Rate } from 'antd'
import styled from 'styled-components'
import { Col, Container, Row } from '@qonsoll/react-design'

// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function CustomRating(props) {
  const { allowClear, character, count, tooltips } = props
  const StyledRate = styled(Rate)`
    &.ant-rate {
      font-size: 40px;
      color: #1890ff;
      //&:active {
      //  color: blue;
      //}
    }
  `
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

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
    <Container>
      <Row>
        <Col>
          <StyledRate
            autoFocus={false}
            character={character}
            count={count}
            allowClear={allowClear}
            tooltips={tooltips}
          />
        </Col>
      </Row>
    </Container>
  )
}

CustomRating.propTypes = {}

export { CustomRating }
