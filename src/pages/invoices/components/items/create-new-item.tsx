import type { ChangeEvent, FC, MouseEvent } from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormControlLabel, OutlinedInput, Switch } from '@mui/material';

const CreateNewItem = () => {
  const [isForfait, setForfait] = useState(false);

  const handleForfaitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForfait(event.target.checked);
  };

  return (
    <CardContent>
      <Grid
        container
        spacing={0}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Description
          </Typography>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <OutlinedInput
                fullWidth
                multiline
                rows={4}
                label="Description"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
              container
              spacing={2}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Prix unité"
                  name="sku"
                />
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Quantité"
                  type="number"
                  name="quantity"
                ></TextField>
              </Grid>
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <Stack
                alignItems="end"
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                <Button
                  type="submit"
                  variant="contained"
                >
                  Ajouter
                </Button>
                <Button
                  color="warning"
                  variant="outlined"
                >
                  Effacer
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default CreateNewItem;
