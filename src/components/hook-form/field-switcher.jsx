import MenuItem from '@mui/material/MenuItem';

import buildRules from 'src/utils/build-rules';

import { Field } from 'src/components/hook-form/hook-form-fields';

export default function FieldSwitcher({ node, name }) {
  const { restriction } = node.element_type;
  const common = {
    name,
    label: node.verbose_name,
    required: node.min >= 1,
    rules: buildRules(node),
  };

  if (restriction.restriction_type === 'enum_restriction') {
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
  if (restriction.base === 'boolean') return <Field.Switch name={name} label={node.verbose_name} />;
  if (restriction.base === 'dateTime') return <Field.MobileDateTimePicker {...common} />;
  return <Field.Text {...common} />;
}
