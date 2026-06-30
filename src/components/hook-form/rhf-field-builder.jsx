import { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { INPUT_FIELD_TYPES } from 'src/constants';

import FieldSwitcher from 'src/components/hook-form/field-switcher';

function SequenceChild({ node, path }) {
  return (
    <div style={{ paddingLeft: 10, paddingBottom: 10 }}>
      {node.element_type.children[0].map((child) => (
        <FieldBuilder key={child.name} node={child} name={path} />
      ))}
    </div>
  );
}

function OptionalGroup({ node, path }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="input-field">
      <FormControlLabel
        sx={{ p: 2, m: 0, width: '100%', backgroundColor: '#f7f7f7', borderRadius: 1 }}
        control={<Checkbox checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />}
        label={
          <Typography variant="subtitle1" fontWeight="bold">
            {node.verbose_name}
          </Typography>
        }
      />

      {enabled && <SequenceChild node={node} path={path} />}
    </div>
  );
}

export default function FieldBuilder({ node, name }) {
  const path = name ? `${name}.${node.name}` : node.name;
  const { type } = node.element_type;

  if (type === INPUT_FIELD_TYPES.ELEMENT_SEQUENCE) {
    if (node.min === 0) {
      return <OptionalGroup node={node} path={path} />;
    }

    return (
      <div className="input-field">
        <Typography variant="subtitle1" sx={{ mb: 1, p: 2, backgroundColor: '#f0f0f0' }}>
          {node.verbose_name}
        </Typography>
        <SequenceChild node={node} path={path} />
      </div>
    );
  }

  if (type === INPUT_FIELD_TYPES.BOOLEAN) {
    const picked = node.element_type.children[0][node.element_type.selected_child_index];
    return <FieldBuilder node={picked} name={path} />;
  }

  return <FieldSwitcher node={node} name={path} />;
}
