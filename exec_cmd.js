const { exec } = require("child_process");

const APP = 'typeform'

const COMPONENTS = [
  {
    "app": "typeform",
    "domain": "Form",
    "type": "view",
    "name": "FormSimpleView"
  },
  {
    "app": "typeform",
    "domain": "Question",
    "type": "form",
    "name": "QuestionForm"
  },
  {
    "app": "typeform",
    "domain": "QuestionType",
    "type": "view",
    "name": "QuestionTypeView"
  },
  {
    "app": "typeform",
    "domain": "QuestionType",
    "type": "list",
    "name": "QuestionTypesList"
  },
  {
    "app": "typeform",
    "domain": "QuestionType",
    "type": "select",
    "name": "QuestionTypeSelect"
  },
  {
    "app": "typeform",
    "domain": "Question",
    "type": "view",
    "name": "QuestionSimpleView"
  },
  {
    "app": "typeform",
    "domain": "Question",
    "type": "view",
    "name": "QuestionAdvancedView"
  },
  {
    "app": "typeform",
    "domain": "Question",
    "type": "list",
    "name": "QuestionsList"
  },
  {
    "app": "typeform",
    "domain": "Response",
    "type": "view",
    "name": "ResponseView"
  },
  {
    "app": "typeform",
    "domain": "Response",
    "type": "list",
    "name": "ResponseList"
  },
  {
    "app": "typeform",
    "domain": "Form",
    "type": "view",
    "name": "FormAdvancedView"
  },
  {
    "app": "typeform",
    "domain": "QuestionInput",
    "type": "view",
    "name": "QuestionInputView"
  },
  {
    "app": "typeform",
    "domain": "QuestionInput",
    "type": "list",
    "name": "QuestionInputsList"
  },
  {
    "app": "typeform",
    "domain": "Condition",
    "type": "view",
    "name": "ConditionView"
  },
  {
    "app": "typeform",
    "domain": "Condition",
    "type": "view",
    "name": "ConditionView"
  },
  {
    "app": "typeform",
    "domain": "Condition",
    "type": "view",
    "name": "ConditionsList"
  },
  {
    "app": "typeform",
    "domain": "Condition",
    "type": "form",
    "name": "ConditionForm"
  },
  {
    "app": "typeform",
    "domain": "Form",
    "type": "form",
    "name": "FormConditionsForm"
  }
]

const ROUTES = [
  {
    "app": "typeform",
    "domain": "Form",
    "name": "FormsAll"
  },
  {
    "app": "typeform",
    "domain": "Form",
    "name": "FormEdit"
  },
  {
    "app": "typeform",
    "domain": "Form",
    "name": "FormShow"
  }
]

COMPONENTS.filter(component => component.app === APP).forEach(component => {
  exec(`qonsoll component --domainName ${component.domain} --componentName ${component.name}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
})

ROUTES.filter(route => route.app === APP).forEach(route => {
  exec(`qonsoll route --domainName ${route.domain} --routeName ${route.name}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
})