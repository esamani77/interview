import { Controller, useFormContext } from 'react-hook-form';

import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function RHFAutocomplete({
  name,
  label,
  helperText,
  rules,
  hiddenLabel,
  placeholder,
  description,
  uppercase,
  required,
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          id={`rhf-autocomplete-${name}`}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              required={required}
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
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'off',
                style: {
                  textTransform: uppercase ? 'uppercase' : 'none',
                },
              }}
              InputProps={{
                ...params.InputProps,
                sx: {
                  backgroundColor: (theme) => required && alpha(theme.palette.warning.light, 0.1),
                },
                endAdornment: (
                  <>
                    <Tooltip arrow placement="top" title={description}>
                      <Iconify
                        color="text.secondary"
                        icon="solar:question-circle-bold"
                        width={18}
                      />
                    </Tooltip>
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
