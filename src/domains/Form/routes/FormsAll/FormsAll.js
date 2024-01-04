import { Input, Spin } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import { FormList } from '../../components'
import { FormSimpleFormWithModal } from '../../../../domains/Form/components'
import Fuse from 'fuse.js'
import { PageHeader } from '../../../../components'
import PropTypes from 'prop-types'
import { useCreateForm } from '../../hooks/create'
import { useGetForms } from '../../hooks/get'
import { useTranslations } from '@qonsoll/translation'

function FormsAll(props) {
  const {
    firebase,
    showHeader,
    actions = {},
    childrenModal,
    wrapperPaddings,
    disableAddButton
  } = props

  // [ADDITIONAL HOOKS]
  const searchRef = useRef()
  const { t } = useTranslations()
  const createForm = useCreateForm(firebase)
  const [forms, formsLoading] = useGetForms(firebase)

  const fuse = new Fuse(forms, { keys: ['title'] })

  // [COMPONENT STATE HOOKS]
  const [searchResult, setSearchResult] = useState(forms)

  // [COMPUTED PROPERTIES]
  const containerPadding = wrapperPaddings || ['24px', '24px', '32px']
  const formsQuantity = useMemo(() => searchResult?.length, [searchResult])
  const subtitle = `${t('You have')} ${formsQuantity} ${t('form')}(s)`

  // [USE_EFFECTS]
  useEffect(() => {
    setSearchResult(forms)
  }, [forms])

  // [CLEAN FUNCTIONS]
  const handleFindForms = () => {
    if (searchRef.current.input.value) {
      const searchRes = fuse.search(searchRef.current.input.value)
      setSearchResult(searchRes?.map((item) => item.item))
    } else setSearchResult(forms)
  }

  if (formsLoading) {
    return <Spin />
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <div p={containerPadding}>
          {showHeader && (
            <PageHeader
              title={t('Forms')}
              subtitle={subtitle}
              actions={
                !disableAddButton && (
                  <FormSimpleFormWithModal
                    title="Create new form"
                    onSubmit={createForm}
                  >
                    {childrenModal}
                  </FormSimpleFormWithModal>
                )
              }
            />
          )}

          {forms?.length > 4 && (
            // Search will be visible only when there's will be more than 4 forms
            <Input
              mb="32px"
              ref={searchRef}
              placeholder={`${t('Search form by name')}...`}
              onChange={handleFindForms}
            />
          )}

          <FormList firebase={firebase} forms={searchResult} />
        </div>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormsAll.propTypes = {
  firebase: PropTypes.object.isRequired,
  showHeader: PropTypes.bool,
  actions: PropTypes.shape({
    onFormShow: PropTypes.func,
    onFormItemClick: PropTypes.func
  }),
  childrenModal: PropTypes.node,
  wrapperPaddings: PropTypes.string,
  disableAddButton: PropTypes.bool
}

export default FormsAll
