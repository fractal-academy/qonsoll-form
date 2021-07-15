import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

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
  const { data } = props

  return <Table columns={columns} dataSource={data} />
}

ResponseTable.propTypes = {
  data: PropTypes.array
}

export default ResponseTable
