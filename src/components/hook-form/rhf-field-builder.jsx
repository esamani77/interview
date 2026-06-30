import Typography from '@mui/material/Typography';

import FieldSwitcher from 'src/components/hook-form/field-switcher';

export function FieldBuilder({ node, name }) {
  const path = name ? `${name}.${node.name}` : node.name;
  const { type } = node.element_type;

  if (type === 'element_sequence') {
    return (
      <div className="input-field">
        <Typography variant="subtitle1" sx={{ mb: 1, p: 2, backgroundColor: '#f0f0f0' }}>
          {node.verbose_name}
        </Typography>
        <div style={{ paddingLeft: 10, paddingBottom: 10 }}>
          {node.element_type.children[0].map((child) => (
            <FieldBuilder key={child.name} node={child} name={path} />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'choice') {
    const picked = node.element_type.children[0][node.element_type.selected_child_index];
    return <FieldBuilder node={picked} name={path} />;
  }

  return <FieldSwitcher node={node} name={path} />;
}
