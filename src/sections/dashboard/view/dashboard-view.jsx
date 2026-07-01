// ----------------------------------------------------------------------

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Card, Dialog, Button, Typography, DialogTitle, DialogContent } from '@mui/material';

import refillJson from 'src/utils/refill-json';

import { Form } from 'src/components/hook-form/hook-form-fields';
import FieldBuilder from 'src/components/hook-form/rhf-field-builder';

import formJson from '../../../../public/data.json';

export default function DashboardView() {
  const methods = useForm({
    shouldUnregister: true,
  });
  const { handleSubmit } = methods;
  const [filledForm, setFilledForm] = useState(null);

  const {
    appHdr: { element: form },
  } = formJson;

  const onSubmit = handleSubmit(
    (data) => {
      const filledFormData = {
        appHdr: { element: refillJson(form, data[form.name]) },
      };
      console.log(filledFormData);
      setFilledForm(filledFormData);
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

      <Dialog open={!!filledForm} onClose={() => setFilledForm(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Submitted Data</DialogTitle>
        <DialogContent>
          <pre>{JSON.stringify(filledForm, null, 2)}</pre>
        </DialogContent>
      </Dialog>
    </>
  );
}
