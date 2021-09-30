import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { TEXTINGS } from '../../../../constants'
import { Box, NoData } from '@qonsoll/react-design'
import { Spinner } from '../../../../../src/components'
import { useTranslation } from '../../../../context/Translation'
import { StyledTable } from '../../../../domains/Response/components/ResponseTable/ResponseTable.style'

const columns = [
  {
    render: (text, record) => (
      <div
        style={{
          wordWrap: 'break-word',
          wordBreak: 'break-word',
          width: '50px'
        }}>
        {text}
      </div>
    ),
    title: '#',
    dataIndex: 'order',
    key: 'order',
    sortOrder: 'descend',
    width: '50px'
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
    title: 'Answer',
    dataIndex: 'answer',
    key: 'answer'
  }
]

function ResponseTable(props) {
  const { data, loading, isFormQuiz } = props
  const { answersNoSelectedUser } = useTranslation()

  useEffect(() => {
    if (isFormQuiz)
      columns?.push({
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
        title: 'Answer Scores',
        dataIndex: 'answerScore',
        key: 'answerScore'
      })
  }, [isFormQuiz])

  return (
    <Box overflowX="hidden">
      {loading ? (
        <Spinner width="100%" size="large" />
      ) : (
        <Box>
          {!!data?.length ? (
            <StyledTable
              sortOrder
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          ) : (
            <NoData
              description={
                answersNoSelectedUser || TEXTINGS.answersNoSelectedUser
              }
            />
          )}
        </Box>
      )}
    </Box>
  )
}

ResponseTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  isFormQuiz: PropTypes.bool
}

export default ResponseTable
