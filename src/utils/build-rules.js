export default function buildRules(node) {
  const rules = {};
  const r = node.element_type.restriction ?? {};

  if (node.min >= 1) rules.required = `${node.verbose_name} is required`;
  if (r.minLength)
    rules.minLength = { value: Number(r.minLength), message: `Min ${r.minLength} chars` };
  if (r.maxLength)
    rules.maxLength = { value: Number(r.maxLength), message: `Max ${r.maxLength} chars` };
  if (r.pattern) rules.pattern = { value: new RegExp(r.pattern), message: 'Invalid format' };

  return rules;
}
