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
  justify-content: center;
  align-items: center !important;
  border-radius: var(--qf-border-radius-md);
  background-color: var(--qf-button-bg);

  &:hover {
    background-color: var(--qf-button-bg-hover);
  }
`
