import React from 'react'
import { Spin, Table } from 'antd'
import { EmptyState } from '../../../Form/components/FormConditionsForm/FormConditionsForm.styles'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'

const columns = [
  {
    title: 'Question',
    dataIndex: 'questionTitle',
    key: 'questionTitle'
  },
  {
    title: 'Answer',
    dataIndex: 'answer',
    key: 'answer'
  }
]

function ResponseTable(props) {
  const { data, loading } = props

  return (
    <Box display="flex" flex={1} justifyContent="center">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          {data?.length > 0 ? (
            <Table columns={columns} dataSource={data} />
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </Box>
  )
}

ResponseTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool
}

export default ResponseTable
