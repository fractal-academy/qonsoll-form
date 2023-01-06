import { Box } from '@qonsoll/react-design'
import { Drawer } from 'antd'
import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import React from 'react'

const SidebarBoxWrapper = (props) => {
  const { children, showDrawer, setShowDrawer } = props

  // [HELPER FUNCTIONS]
  const hideDrawer = () => {
    setShowDrawer(false)
  }

  return (
    <>
      <Box
        p="8px"
        display={['none', 'none', 'none', 'flex']}
        width="var(--qf-sidebar-width)"
        bg="var(--qf-sidebar-bg)"
        flexDirection="column"
        minWidth={300}>
        {children}
      </Box>

      <Drawer
        closeIcon={
          showDrawer && (
            <Icon
              borderRadius="var(--ql-border-radius-md) 0 0 var(--ql-border-radius-md)"
              right="var(--qf-sidebar-width)"
              bg="var(--ql-color-white)"
              onClick={hideDrawer}
              name="CloseFilled"
              position="fixed"
              size={20}
              top={0}
              p="6px"
            />
          )
        }
        bodyStyle={{
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 'var(--qf-typography-fs-body)'
        }}
        width="var(--qf-sidebar-width)"
        visible={showDrawer}>
        {showDrawer && children}
      </Drawer>
    </>
  )
}

SidebarBoxWrapper.propTypes = {
  children: PropTypes.node,
  showDrawer: PropTypes.bool,
  setShowDrawer: PropTypes.func
}

export default SidebarBoxWrapper
