import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

function NumberedCard(props) {
  const { number, children } = props

  const HiddenBox = styled(Box)`
    position: absolute;
    top: 20px;
    width: 24px;
    height: 32px;
    border-radius: 5px;
    background-color: #424851;
  `
  const ContentBox = styled(Box)`
    position: inherit;
    z-index: 400;
    left: 4px;
    padding: 16px;
    border-radius: 16px;
    background-color: #eceff5;
    &:hover {
      background-color: #e6e6e6;
      transition: background-color 1s;
    }
  `
  const NumberBox = styled(Box)`
    position: absolute;
    top: 25px;
    width: 24px;
    height: 22px;
    z-index: 600;
    border-radius: 5px;
    text-align: center;
    color: #eceff5;
    background-color: #424851;
  `

  return (
    <Box position="relative">
      <HiddenBox />
      <ContentBox>{children}</ContentBox>
      <NumberBox>{number}</NumberBox>
    </Box>
  )
}

NumberedCard.propTypes = {
  number: PropTypes.number,
  children: PropTypes.node
}

export default NumberedCard
