# &#x1F4D8; Qonsoll form documentation

[**Qonsoll form**](https://github.com/fractal-academy/feedback-typeform-app) is a service for surveys' form builder. It makes collecting and sharing information comfortable and conversational.
Current project is used as module in other projects.


- [How to run app localy for further changes](#how-to-run-app-localy-for-further-changes)
- [How to implement module in existing project](#how-to-implement-module-in-existing-project)
- [How to run app with already installed module](#how-to-run-app-with-already-installed-module)
- [How to configure workflow](#how-to-configure-workflow)
- [How to configure and use module](#how-to-configure-and-use-module)
- [How to configure module theme](#how-to-configure-module-theme)
- [How to configure translations](#how-to-configure-translations)


## How to run app localy for further changes

Pull the project using folowing command:

```sh
git clone --recurse-submodules https://github.com/fractal-academy/qonsoll-form-wrapper
```

Switch to project folder:

```sh
cd qonsoll-form-wrapper
```

Install all dependecies and pull latest changes:

```sh
npm i
```

Some packages need manual instalation. Run following command:

```sh
npm i fuse.js use-media
```

&#10071; For correct work of components you'll need to add an index to your firebase. In [**console firebase**](https://console.firebase.google.com) select your project, go to Firestore Database menu item and choose Indexes tab.
Add `formId` and `order` as indexed fields for questions collection. Leave index rule default (ascending).

## How to implement module in existing project

If it's first initialisation of module in project create folder for modules in directory of your existing project:

```sh
mkdir src/modules
```

Go to the created folder:

```sh
cd src/modules
```

Add typeform module to your project by following command:

```sh
git submodule add https://github.com/fractal-academy/qonsoll-form.git
```

Go to the /module folder:

```sh
cd qonsoll-form
```

Get newest changes of module:

```sh
git pull origin library
```

Go the directory of your project and install all of packages:

```sh
cd ../../../
```

```sh
npm install
```

Some packages need manual instalation. Run following command:

```sh
npm i fuse.js use-media
```

&#10071; For correct work of components you'll need to add an index to your firebase. In [**console firebase**](https://console.firebase.google.com) select your project, go to Firestore Database menu item and choose Indexes tab.
Add `formId` and `order` as indexed fields for questions collection. Leave index rule default (ascending).

## How to run app with already installed module

After cloning existing project to your computer, install all packages:

```sh
npm install
```

Make shure that there's present /modules folder and .gitmodules file in your project.
Go to /modules folder and use following comands:

```sh
git submodule update --init --recursive
```

```sh
git submodule update --recursive --remote
```

## How to configure workflow

In block steps first you need to install all dependencies.

```sh
- run: npm install
```

Get the latest changes of module. Go to the modules directory:

```sh
- run: cd src/modules
```

By following commands update modules:

```sh
- run: git submodule update --init --recursive
```

```sh
- run: git submodule update --recursive --remote
```

Go back to your project directory and install node modules:

```sh
- run: cd ../../ && npm install
```

Next step - you need to build your application:

```sh
- run: npm run build:dev
```

If you project does'n run after following steps, that means that there's console warnings in you project. To fix that you need to add flag to you run command.

```sh
- run: CI=false npm run build:dev
```

After that, if there's exception that you have not enough memory in docker, you can run following command (it increases volume of memory to 8Gb):

```sh
- run: CI=false NODE_OPTIONS=--max-old-space-size=8192 npm run build:dev
```

## How to configure and use module

For correct module work you need to fulfill next steps.
- To use qonsoll form component, you need to import it and propagate required properties. There are four in total components: `FormsAll`, `FormEdit`, `FormShow` and `FormAnswers`. There's example of `FormsAll` component usage:

```sh
import React from 'react'
import { FormsAll } from 'qonsoll-form/src'
. . .

function YourComponentName() {
  
  const history = useHistory()

  //this name is required
  const onFormItemClick = (id) => {
    const path = generatePath(ROUTES_PATHS.FORM_EDIT, { id })
    history.push(path)
  }

  return (
    <FormAll
      firebase={firebase}
      actions={{
        onFormItemClick: onFormItemClick
      }}
    />
  )
}
```
&#10071; Qonsollform module requires outer handling of routing. That means you need to have prepared constant with route name and propagate through `actions` object routing function with correct naming.
- `FormsAll` has only one required property: `firebase`. There's also optional properties: `showHeader` - handles whether will be used header of module, or your own, `wrapperPaddings` - handles size of outer wrapper of conponent; default value - 32px, `childrenModal` - propagates node as child to form creation modal, if you need more form items, `disableAddButton` - handles showing of form creation button.
- `FormEdit` component has `id` (form id) and `firebase` as required properties. As optional it has also `actions` property to be propagated. Example of needed functions:

```sh
  const { id } = useParams()
  const history = useHistory()
  
  const onFormShow = (id) => {
    const path = generatePath(ROUTES_PATHS.FORM_SHOW, { id })
    history.push(path)
  }
  const onFormResultsShow = (id) => {
    const path = generatePath(ROUTES_PATHS.FORM_ANSWERS, { id })
    history.push(path)
  }
```
Other optional properties: `customHeader` (propagate node for custom header and `null` to hide it), `wrapperPaddings` (all are the same as in `FormsAll`) and `customQuestionTypes` - if you need to configure question type list (to remove excess question types), configure following array and propagate it through property:

```sh
[
  {
    type: QUESTION_TYPES.WELCOME_SCREEN,
    description: welcomeScreenDesc || QUESTION_DESCRIPTIONS.WELCOME_SCREEN,
    icon: <HomeOutlined />
  },
  {
    type: QUESTION_TYPES.LONG_TEXT,
    description: longTextDesc || QUESTION_DESCRIPTIONS.LONG_TEXT,
    icon: <FileTextOutlined />
  },
  {
    type: QUESTION_TYPES.SHORT_TEXT,
    description: shortTextDesc || QUESTION_DESCRIPTIONS.SHORT_TEXT,
    icon: <SmallDashOutlined />
  },
  {
    type: QUESTION_TYPES.DATE,
    description: dateDesc || QUESTION_DESCRIPTIONS.DATE,
    icon: <CalendarOutlined />
  },
  {
    type: QUESTION_TYPES.YES_NO,
    description: yesnoDesc || QUESTION_DESCRIPTIONS.YES_NO,
    icon: <ShareAltOutlined />
  },
  {
    type: QUESTION_TYPES.CHOICE,
    description: choiceDesc || QUESTION_DESCRIPTIONS.CHOICE,
    icon: <GoldOutlined />
  },
  {
    type: QUESTION_TYPES.PICTURE_CHOICE,
    description: pictureChoiceDesc || QUESTION_DESCRIPTIONS.PICTURE_CHOICE,
    icon: <PictureOutlined />
  },
  {
    type: QUESTION_TYPES.OPINION_SCALE,
    description: opinionDesc || QUESTION_DESCRIPTIONS.OPINION_SCALE,
    icon: <HomeOutlined />
  },
  {
    type: QUESTION_TYPES.RATING,
    description: ratingDesc || QUESTION_DESCRIPTIONS.RATING,
    icon: <StarOutlined />
  },
  {
    type: QUESTION_TYPES.FILE_UPLOAD,
    description: fileUploadDesc || QUESTION_DESCRIPTIONS.FILE_UPLOAD,
    icon: <UploadOutlined />
  },
  {
    type: QUESTION_TYPES.STATEMENT,
    description: statementDesc || QUESTION_DESCRIPTIONS.STATEMENT,
    icon: <CopyrightOutlined />
  },
  {
    type: QUESTION_TYPES.VIDEO_ANSWER,
    description: videoAnswerDesc || QUESTION_DESCRIPTIONS.VIDEO_ANSWER,
    icon: <VideoCameraOutlined />
  }
]
```
- `FormShow` component has `id` (form id) and `firebase` as required properties. As optional it has also `showHeader`, `wrapperPaddings` and `submitLoading` (action on form finish button) properties. The `actions` property is not needed.
- `FormAnswers` component has also `id` (form id) and `firebase` as required properties. As optional it has also `showHeader` and `wrapperPaddings` properties. The `actions` property is not needed.
- To correct work of components you need to add vars of qonsoll form. Check out [next step](#how-to-configure-module-theme) for it.

## How to configure module theme
- First of all, if you new to qonsoll/react-design package, check out this [**documentation**](https://github.com/qonsoll/react-design/tree/doc-usage-vars). Qonsoll form is built using its components and theme.
- Qonsollform supports theme changing. Most of theme colors and spacings'll be taken from your original vars.css file, that was added to project earlier. Follow next steps to configure module theme.
- There's list of all vars, used in Qonsollform. If you need change something in module appearance, just rewrite suitable var with needed value. Due to unical name of variables, your app'll still remaining its previous appearence.

```sh
  /* static list */
  --qf-list-item-bg: var(--ql-color-dark-t-lighten5);
  --qf-list-item-hover: var(--ql-color-dark-t-lighten6);

  --qf-list-item-preview: var(--ql-color-white);

  /* drag and drop */
  --qf-dnd-item-badge-bg: var(--ql-color-dark-lighten1);
  --qf-dnd-item-badge-color: var(--ql-color-white);
  
  --qf-dnd-item-bg: var(--ql-color-dark-t-lighten5);
  --qf-dnd-item-hover: var(--ql-color-dark-t-lighten4); 

  --qf-dnd-active-item-bg: var(--ql-color-accent1-t-lighten4);
  --qf-dnd-active-item-hover: var(--ql-color-accent1-t-lighten3); 

  /* content card */
  --qf-content-card-bg: var(--ql-color-white);

  /* layout */
  --qf-sidebar-bg: var(--ql-color-white);
  --qf-sidebar-width: 350px;
  --qf-header-mb: 8px;

  /* button */
  --qf-button-bg: var(--ql-color-dark-t-lighten5);
  --qf-button-bg-hover: var(--ql-color-accent1-t-lighten4);
  --qf-button-bg-active: var(--ql-color-accent1);

  --qf-button-color: var(--ql-color-dark);
  --qf-button-color-active: var(--ql-color-white);

  --qf-keybox-bg: var(--ql-color-white);
  --qf-keybox-bg-active: var(--ql-color-accent1);
  --qf-keybox-color: var(--ql-color-dark);
  --qf-keybox-color-active: var(--ql-color-white);

  --qf-submit-button-font-size: var(--ql-font-size-h4);
  
  /* input */
  --qf-input-background: var(--ql-color-dark-t-lighten5);

  /* tag */
  --qf-tag-color: var(--ql-color-accent1);

  /* uploader */
  --qf-uploader-color: var(--ql-color-white);
  --qf-uploader-bg: var(--ql-color-accent1);
  --qf-uploader-hover: var(--ql-color-accent1-t-lighten1);

  --qf-uploader-item-bg: var(--ql-color-dark-t-lighten5);

  /* domain component: question */
  --qf-question-type-icon-default: var(--ql-color-dark-t-lighten4);
  --qf-question-type-icon-danger: var(--ql-color-danger-t-lighten3);
  --qf-question-header-font-size: var(--ql-font-size-h3);

  /*domain component: condition */
  --qf-condition-item-bg: var(--ql-color-dark-t-lighten6);
  --qf-condition-item-border: var(--ql-color-dark-t-lighten4);

  /* typography */
  --qf-typography-fs-title: var(--ql-font-size-h2);
  --qf-typography-fs-body: var(--ql-font-size-body1);
  --qf-typography-fs-caption: var(--ql-font-size-caption1);

  --qf-typography-title-color: var(--ql-color-dark);
  --qf-typography-subtitle-color: var(--ql-color-dark-t-lighten1);
  --qf-typography-caption-color: var(--ql-color-dark-t-lighten2);

  /* border radius */
  --qf-border-radius-sm: var(--ql-border-radius-sm);
  --qf-border-radius-md: var(--ql-border-radius-md);
  --qf-border-radius-lg: var(--ql-border-radius-16);
  --qf-border-radius-full: var(--ql-border-radius-full);
```

- Qonsoll form has also overwritten `antd` components vars. Use the following vars with care.

```sh
   /* overwritten menu */
  --ql-menu-item-active-bg: var(--ql-color-accent1-t-lighten3);

  /* overwritten form */
  --ql-form-item-vertical-spacing: 0;
```

## How to configure translations
Qonsollform will perfectly fine work without translations propagating, but app will appear only in English. If you need to add another interface language, install 0.4.3 version of `@qonsoll/translations` in your parent application.

```sh
npm i @qonsoll/translation@0.4.3
```
