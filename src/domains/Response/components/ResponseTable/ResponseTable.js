import React from 'react'
import { Spin, Table } from 'antd'
import { EmptyState } from '../../../Form/components/FormConditionsForm/FormConditionsForm.styles'
import PropTypes from 'prop-types'
import { Box, Col, Row } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'

const columns = [
  {
    title: '#',
    dataIndex: 'order',
    key: 'order',
    sortOrder: 'descend',
    width: '60px'
  },
  {
    width: 500,
    title: 'Question',
    dataIndex: 'questionTitle',
    key: 'questionTitle'
  },
  { width: 500, title: 'Answer', dataIndex: 'answer', key: 'answer' }
]

function ResponseTable(props) {
  const { data, loading } = props
  const { emptyStateAnswersDescription } = useTranslation()

  return (
    <Box display="flex" flex={1} justifyContent="center">
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row>
          <Col>
            {data?.length > 0 ? (
              <Table
                sortOrder
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
              />
            ) : (
              <EmptyState
                description={
                  emptyStateAnswersDescription || 'No answers to display'
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
