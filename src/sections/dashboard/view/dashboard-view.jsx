// ----------------------------------------------------------------------

import { useForm } from 'react-hook-form';

import { Card, Button, Typography } from '@mui/material';

import refillJson from 'src/utils/refill-json';

import { Form } from 'src/components/hook-form/hook-form-fields';
import FieldBuilder from 'src/components/hook-form/rhf-field-builder';

import formJson from '../../../../public/data.json';

export default function DashboardView() {
  const methods = useForm({
    shouldUnregister: true,
  });
  const { handleSubmit } = methods;

  const {
    appHdr: { element: form },
  } = formJson;

  const onSubmit = handleSubmit(
    (data) => {
      const filledForm = {
        appHdr: { element: refillJson(form, data[form.name]) },
      };
      console.log(filledForm);
      alert('Form submitted successfully');
    },
    (errors) => {
      alert('Form validation failed');
      console.log(errors);
    }
  );

  return (
    <>
      <Typography variant="h3" textAlign="center">
        Welcome to RUNC!
      </Typography>
      <Form methods={methods} onSubmit={onSubmit}>
        <Card spacing={2} sx={{ maxWidth: 640, mx: 'auto', p: 3 }}>
          <FieldBuilder node={form} />
        </Card>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Form>
    </>
  );
}
