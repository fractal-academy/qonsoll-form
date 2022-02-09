import { Box } from '@qonsoll/react-design'
import { CloseOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import React from 'react'

const SidebarBoxWrapper = (props) => {
  const { children, isDrawerVisible, setDraverVisible } = props

  // [HELPER FUNCTIONS]
  const hideDrawer = () => {
    setDraverVisible(false)
  }

  return (
    <>
      <Box
        display={['none', 'none', 'none', 'flex']}
        minWidth={300}
        flexDirection="column"
        bg="var(--qf-sidebar-bg)"
        width="var(--qf-sidebar-width)">
        {children}
      </Box>

      <Drawer
        closeIcon={
          isDrawerVisible && (
            <Box
              borderRadius="var(--ql-border-radius-md) 0 0 var(--ql-border-radius-md)"
              right="var(--qf-sidebar-width)"
              bg="var(--ql-color-white)"
              onClick={hideDrawer}
              position="fixed"
              p={2}
              top={0}>
              <CloseOutlined />
            </Box>
          )
        }
        bodyStyle={{
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          fontSize: 'var(--qf-typography-fs-body)'
        }}
        width="var(--qf-sidebar-width)"
        visible={isDrawerVisible}>
        {isDrawerVisible && children}
      </Drawer>
    </>
  )
}

export default SidebarBoxWrapper
