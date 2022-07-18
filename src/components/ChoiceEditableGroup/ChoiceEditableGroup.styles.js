import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'

export const styles = {
  mainBox: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  }
}

export const AddNewChoiceBox = styled(Box)`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-color: var(--qf-button-bg);
  border-radius: var(--btn-border-radius-base);

  &:hover {
    background-color: var(--qf-button-bg-hover);
  }
`
