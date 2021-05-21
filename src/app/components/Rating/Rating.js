import { Rate } from 'antd'
import styled from 'styled-components'
import { Col, Container, Row } from '@qonsoll/react-design'
import theme from 'app/styles/theme'

function CustomRating(props) {
  const { allowClear, character, count, tooltips } = props
  const StyledRate = styled(Rate)`
    &.ant-rate {
      font-size: 40px;
      color: ${theme.color.primary.default};
      //&:active {
      //  color: blue;
      //}
    }
  `

  return (
    <Container>
      <Row noGutters>
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
