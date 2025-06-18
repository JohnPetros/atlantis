import { FormContainerView } from './form-container-view'
import { FormItem } from './form-item-view'
import { FormLabelView } from './form-label-view'
import { FormControlView } from './form-control-view'
import { FormDescriptionView } from './form-description-view'
import { FormMessageView } from './form-message-view'
import { FormFieldView } from './form-field-view'
import { FormGroupTitleView } from './form-group-title-view'
import { FormGroupView } from './form-group-view'

export const Form = {
  Container: FormContainerView,
  Item: FormItem,
  Label: FormLabelView,
  Field: FormFieldView,
  Control: FormControlView,
  Description: FormDescriptionView,
  Message: FormMessageView,
  GroupTitle: FormGroupTitleView,
  Group: FormGroupView,
}
