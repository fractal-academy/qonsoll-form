import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

export const UploadItem = styled(Box)`
  background-color: var(--qf-uploader-item-bg);
  border-radius: var(--qf-border-radius-md);
`

export const IconLabel = styled.label`
  ${({ disabled, isHovering }) => `
    width: 50px;
    height: 50px;
    border-radius: var(--qf-border-radius-full);
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    justify-content: center;
    display: flex;
    align-items: center;
    position: relative;
    color: var(--qf-uploader-color);
    background-color: ${
      isHovering ? 'var(--qf-uploader-bg)' : 'var(--qf-uploader-hover)'
    };
  `}
`
