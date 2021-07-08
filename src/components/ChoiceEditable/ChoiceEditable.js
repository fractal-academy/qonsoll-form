import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  LetterBox,
  DeleteButton,
  ChoiceInput,
  CustomCol,
  ChoiceOptionCol,
  MediaBox,
  MainBox
} from './ChoiceEditable.styles'
import { DEFAULT_IMAGE } from '../../constants'
import { Row } from '@qonsoll/react-design'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { MediaLibraryModal } from '../../domains/MediaLibrary/components'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'
import { useTranslation } from '../../context/Translation'
import { Popconfirm } from 'antd'

let startLetter = 65

function ChoiceEditable(props) {
  const { index, data, withImage } = props
  //[CUSTOM HOOKS]
  const { editableChoicePlaceholder } = useTranslation()

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  const { popconfirmOnDeleteOptionWithConditions } = useTranslation()

  // [COMPONENT STATE HOOKS]
  const [value, setValue] = useState(data?.answerOption)

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion?.questionConfigurations
  const letter = String.fromCharCode(startLetter + index)
  const bgImage = `url(${data?.image || DEFAULT_IMAGE})`

  const hasConditions = data.redirectQuestion !== ''

  // [CLEAN FUNCTIONS]
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onBlur = async () => {
    //if the value has not changed do nothing, reduce the number of queries to the database
    if (choiceProps[index].answerOption === value) return
    // update the choice we need
    choiceProps[index].answerOption = value
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: choiceProps }
    })
  }

  const onDelete = async () => {
    //remove item from array with 'index' position,
    //'1' - amount of deleted elements from index position till the end(check how splice works for details)
    choiceProps.splice(index, 1)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: choiceProps }
    })
  }
  const onMediaModalContinue = (selectedImage) => {
    choiceProps[index].image = selectedImage
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: choiceProps }
    })
  }
  // [USE_EFFECTS]
  useEffect(() => {
    //update text area value when delete element
    setValue(data?.answerOption)
  }, [data])

  return (
    <MainBox m={1} withImage={withImage}>
      {withImage && (
        <MediaBox backgroundImage={bgImage} mx={2} mt={2}>
          <MediaLibraryModal
            btnProps={{
              type: 'primary',
              icon: <EditOutlined />
            }}
            onContinue={onMediaModalContinue}
          />
        </MediaBox>
      )}
      <Row noGutters px={2}>
        {/*<CustomCol cw="auto" v="center">*/}
        <LetterBox>{letter}</LetterBox>
        {/*</CustomCol>*/}
        <ChoiceOptionCol
          width={withImage ? '150px' : '100%'}
          withImage={withImage}>
          <ChoiceInput
            withImage={withImage}
            maxlength="150"
            value={value}
            onBlur={onBlur}
            placeholder={`${editableChoicePlaceholder || 'choice'} ${index}`}
            autoSize={{ minRows: 1, maxRows: 12 }}
            bordered={false}
            onChange={onChange}
          />
        </ChoiceOptionCol>
      </Row>
      {hasConditions ? (
        <Popconfirm
          title={
            popconfirmOnDeleteOptionWithConditions ||
            'This option has connected logic. Delete it?'
          }
          onConfirm={onDelete}
          okType="danger"
          okText="Delete">
          <DeleteButton>
            <CloseOutlined />
          </DeleteButton>
        </Popconfirm>
      ) : (
        <DeleteButton onClick={onDelete}>
          <CloseOutlined />
        </DeleteButton>
      )}
    </MainBox>
  )
}

ChoiceEditable.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object,
  withImage: PropTypes.bool
}

export default ChoiceEditable
