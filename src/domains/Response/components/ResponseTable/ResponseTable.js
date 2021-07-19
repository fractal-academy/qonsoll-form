import React from 'react'
import { Table } from 'antd'
import { EmptyState } from '../../../Form/components/FormConditionsForm/FormConditionsForm.styles'
import PropTypes from 'prop-types'
import { Box, Col, Row } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'
import { Spinner } from '../../../../../src/components'

const columns = [
  {
    render: (text, record) => (
      <div
        style={{
          wordWrap: 'break-word',
          wordBreak: 'break-word'
          // maxWidth: '50px'
        }}>
        {text}
      </div>
    ),
    title: '#',
    dataIndex: 'order',
    key: 'order',
    sortOrder: 'descend'
  },
  {
    render: (text, record) => (
      <div
        style={{
          wordWrap: 'break-word',
          wordBreak: 'break-word',
          width: '100%'
        }}>
        {text}
      </div>
    ),
    // width: 500,
    title: 'Question',
    dataIndex: 'questionTitle',
    key: 'questionTitle'
  },
  {
    render: (text, record) => (
      <div
        style={{
          wordWrap: 'break-word',
          wordBreak: 'break-word',
          width: '100%'
        }}>
        {text}
      </div>
    ),
    // width: 500,
    title: 'Answer',
    dataIndex: 'answer',
    key: 'answer'
  }
]

function ResponseTable(props) {
  const { data, loading } = props
  const { emptyStateAnswersDescription } = useTranslation()

  return (
    <Box display="flex" flex={1} justifyContent="center" overflowX="hidden">
      {loading ? (
        <Spinner width="100%" size="large" />
      ) : (
        <Row width="100%">
          <Col>
            {data?.length > 0 ? (
              <Table
                style={{ width: '100%' }}
                sortOrder
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
              />
            ) : (
              <EmptyState
                style={{ width: '100%' }}
                description={
                  emptyStateAnswersDescription || 'Choose answers to display'
                }
              />
            )}
          </Col>
        </Row>
      )}
    </Box>
  )
}

ResponseTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool
}

export default ResponseTable
