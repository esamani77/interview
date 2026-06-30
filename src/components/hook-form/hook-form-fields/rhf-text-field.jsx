import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

export function RHFTextField({ name, helperText, type, rules, modifyFn, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          inputRef={(element) => {
            ref(element);
            if (element) {
              const originalFocus = element.focus;
              element.focus = (...args) => {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                originalFocus.apply(element, args);
              };
            }
          }}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (modifyFn) {
              event.target.value = modifyFn(event);
            }
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={{
            autoComplete: 'off',
          }}
          {...other}
        />
      )}
    />
  );
}
