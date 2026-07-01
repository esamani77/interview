import { INPUT_FIELD_TYPES } from 'src/constants';

export default function refillJson(node, data) {
  try {
    const { element_type: elementType } = node;

    if (elementType.type === INPUT_FIELD_TYPES.ELEMENT_SEQUENCE) {
      const children = elementType.children[0].map((child) =>
        refillJson(child, data?.[child.name])
      );
      return { ...node, element_type: { ...elementType, children: [children] } };
    }

    if (elementType.type === INPUT_FIELD_TYPES.CHOICE) {
      const { selected_child_index: selectedChildIndex } = elementType;
      const children = elementType.children[0].map((child, index) =>
        index === selectedChildIndex ? refillJson(child, data?.[child.name]) : child
      );
      return { ...node, element_type: { ...elementType, children: [children] } };
    }

    return { ...node, element_type: { ...elementType, value: data ?? '' } };
  } catch (error) {
    console.error(error);
    return node;
  }
}
