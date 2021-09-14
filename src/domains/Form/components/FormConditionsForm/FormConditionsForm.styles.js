import { Tabs } from 'antd'
import styled from 'styled-components'
import { NoData } from '@qonsoll/react-design'

export const EmptyState = styled(NoData)`
  height: 100% !important;
  width: 100%;
  display: flex !important;
  justify-content: center !important;
  flex-direction: column !important;
  margin: 0 !important;
`

export const CustomTabs = styled(Tabs)`
  height: 100%;
  & .ant-tabs-content-top {
    height: 100%;
  }
`
