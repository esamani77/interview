import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import InputAdornment from '@mui/material/InputAdornment';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import { formatStr } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function RHFDatePicker({ name, slotProps, rules, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <MobileDatePicker
          closeOnSelect
          {...field}
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
          value={dayjs(field.value)}
          onChange={(newValue) => {
            if (newValue) {
              field.onChange(dayjs(newValue).format());
            } else {
              field.onChange(null);
            }
          }}
          format={formatStr.split.date}
          slotProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify icon="solar:calendar-mark-bold-duotone" width={24} />
                  </InputAdornment>
                ),
              },
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFMobileDateTimePicker({ name, slotProps, rules, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <MobileDateTimePicker
          closeOnSelect
          {...field}
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
          value={dayjs(field.value)}
          onChange={(newValue) => {
            if (newValue) {
              field.onChange(dayjs(newValue).format());
            } else {
              field.onChange(null);
            }
          }}
          format={formatStr.split.dateTime}
          slotProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify icon="solar:calendar-mark-bold-duotone" width={24} />
                  </InputAdornment>
                ),
              },
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFMobileTimePicker({ name, slotProps, rules, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <MobileTimePicker
          closeOnSelect
          {...field}
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
          value={dayjs(field.value)}
          onChange={(newValue) => {
            if (newValue) {
              field.onChange(dayjs(newValue).format());
            } else {
              field.onChange(null);
            }
          }}
          format={formatStr.time}
          slotProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify icon="solar:clock-circle-bold-duotone" width={24} />
                  </InputAdornment>
                ),
              },
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}
