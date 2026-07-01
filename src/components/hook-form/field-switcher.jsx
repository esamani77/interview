import MenuItem from '@mui/material/MenuItem';

import buildRules from 'src/utils/build-rules';

import { INPUT_BASES, INPUT_FIELD_TYPES } from 'src/constants';

import { Field } from 'src/components/hook-form/hook-form-fields';

export default function FieldSwitcher({ node, name }) {
  const { restriction } = node.element_type;

  const common = {
    name,
    label: node.verbose_name,
    required: node.min >= 1,
    rules: buildRules(node),
  };

  if (restriction.restriction_type === INPUT_FIELD_TYPES.ENUM_RESTRICTION) {
    return (
      <Field.Select {...common}>
        {restriction.children.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Field.Select>
    );
  }
  if (restriction.base === INPUT_BASES.BOOLEAN)
    return (
      <Field.Switch
        name={name}
        label={node.verbose_name}
        defaultValue={!!node.element_type.value}
      />
    );
  if (restriction.base === INPUT_BASES.DATE_TIME) return <Field.MobileDateTimePicker {...common} />;
  return <Field.Text {...common} />;
}
