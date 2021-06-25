import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import typeformTheme from '../../../../../styles/theme'
import { Popconfirm } from 'antd'

export const DescriptionContainer = styled(Box)`
  ${({ theme }) => `
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: ${
    theme?.typography?.lineHeight?.body2 ||
    typeformTheme?.typography?.lineHeight?.body2
  };
`}
`
export const PopconfirmOnDelete = styled(Popconfirm)`
  .ant-popover-inner-content {
    max-width: 310px !important;
  }
`
