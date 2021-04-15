import React, { useEffect } from 'react'
import { Button, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import { Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { styles } from './QuestionSelect.styles'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

const { Option, OptGroup } = Select

function QuestionSelect(props) {
  const { questionList, answers, index, addRedirectQuestion } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onChange = (question, index) => {
    addRedirectQuestion(question, index)
  }
  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  return (
    <Box display="flex" border="1px solid #bbbbbb" borderRadius="4px">
      <Select
        value={answers[index].redirectQuestion || 'Go to the next question'}
        showSearch
        allowClear
        bordered={false}
        onChange={(name) => onChange(name, index)}
        defaultValue="Go to the next question"
        style={styles.selectStyle}>
        <Option value={'Submit form'}>
          <Text strong>Submit form</Text>
        </Option>
        <OptGroup label="JUMP TO...">
          {questionList.map((item, index) => (
            <Option key={index} value={item.name} onClick={() => {}}>
              {item.name}
            </Option>
          ))}
        </OptGroup>
      </Select>
    </Box>
  )
}

QuestionSelect.propTypes = {
  questionList: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired
}

export default QuestionSelect
