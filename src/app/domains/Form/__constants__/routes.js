
    import { FormEdit, FormsAll, FormShow } from '../routes'

    export default [
  {
  name: 'FormEdit',
  path: '/forms/:id/edit',
  exact: true,
  component: FormEdit
}
,
{
  name: 'FormsAll',
  path: '/forms',
  exact: true,
  component: FormsAll
}
,
{
  name: 'FormShow',
  path: '/forms/:id',
  exact: true,
  component: FormShow
}
]
  