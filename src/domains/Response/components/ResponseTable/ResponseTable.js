import React, { useEffect, useMemo } from 'react'

import { Empty } from 'antd'
import PropTypes from 'prop-types'
import { Spinner } from '../../../../../src/components'
import { StyledTable } from '../../../../domains/Response/components/ResponseTable/ResponseTable.style'
import { useTranslations } from '@qonsoll/translation'

function ResponseTable(props) {
  const { data, loading, isFormQuiz } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

  // [COMPUTED PROPERTIES]
  const columns = useMemo(
    () => [
      {
        render: (text) => (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              width: '50px'
            }}
          >
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
        render: (text) => (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              width: '100%'
            }}
          >
            {text}
          </div>
        ),
        title: t('Question'),
        dataIndex: 'questionTitle',
        key: 'questionTitle'
      },
      {
        render: (text) => (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              width: '100%'
            }}
          >
            {text}
          </div>
        ),
        title: t('Answer'),
        dataIndex: 'answer',
        key: 'answer'
      }
    ],
    [t]
  )

  // [USE EFFECTS]
  useEffect(() => {
    if (isFormQuiz)
      columns?.push({
        render: (text) => (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              width: '100%'
            }}
          >
            {text}
          </div>
        ),
        title: t('Score'),
        dataIndex: 'answerScore',
        key: 'answerScore'
      })
  }, [columns, isFormQuiz, t])

  return (
    <div overflowX="hidden">
      {loading ? (
        <Spinner width="100%" size="large" />
      ) : (
        <div>
          {data?.length ? (
            <StyledTable
              sortOrder
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          ) : (
            <Empty description={t('Choose user to display their answers')} />
          )}
        </div>
      )}
    </div>
  )
}

ResponseTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  isFormQuiz: PropTypes.bool
}

export default ResponseTable
