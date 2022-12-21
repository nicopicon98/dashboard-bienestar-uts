import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch, useTheme
} from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { Theme, IconButton, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { tokens } from '../theme';
import esLocale from '@fullcalendar/core/locales/es';
import CreateSchedule from './Loader/createScheduleLoader';
import CreateScheduleLoader from './Loader/createScheduleLoader';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { useEffect } from 'react';
import { respInfoReceived } from '../example';
import { franjasToValue } from '../helpers/franjasToTitle';
import { EventImpl } from '@fullcalendar/core/internal';

interface ScheduleDialogPropsInterface {
  dialogVisible: boolean;
  franjaName: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
  onDialogHidden: () => void;
  onResetCalendarHandler: () => void;
  formik: any;
  newScheduleLoader: boolean;
  selectedState: DateSelectArg;
  schedule: respInfoReceived;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ScheduleDialog = ({
  dialogVisible,
  onDialogHidden,
  formik,
  onResetCalendarHandler,
  newScheduleLoader,
  selectedState,
  schedule
}: ScheduleDialogPropsInterface) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const franjasStatic: Array<{ franjaId: string }> = [
    { franjaId: "0" },
    { franjaId: "1" },
    { franjaId: "2" },
    { franjaId: "3" },
    { franjaId: "4" },
    { franjaId: "5" },
    { franjaId: "6" },
    { franjaId: "7" },
    { franjaId: "8" },
    { franjaId: "9" },
    { franjaId: "10" },
    { franjaId: "11" },
  ]
  let menuItemsSelectedDate: respInfoReceived = [];
  let menuFranjas: Array<{ franjaId: string }> = [];
  let selectedDate: respInfoReceived = []
  let filteredSelectedDate: any
  if (selectedState) {
    filteredSelectedDate = selectedState.view.calendar.getEvents().filter(e => e.startStr === selectedState.startStr)
    selectedDate = filteredSelectedDate.map((e: any) => {
      return {
        id: e.id, //id schedule
        franjaId: e.extendedProps.franjaId, //id franja
        date: e.startStr, //date
        taken: e.extendedProps.taken //schedule state
      }
    })
    menuFranjas = franjasStatic.filter(({ franjaId: franjaA }) => {
      return !selectedDate.some(({ franjaId: franjaB }) => {
        return franjaA === franjaB
      })
    })
  }

  let dialogInfo = <>
    <DialogTitle
      fontWeight="bold"
    >Seleccion de franja
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        A continuacion, selecciona una franja
      </DialogContentText>
      {!newScheduleLoader
        ?
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
          onSubmit={formik.handleSubmit}
        >
          <FormControl
            sx={{ mt: 2, minWidth: 120 }}
          >
            <InputLabel htmlFor="demo-multiple-chip-label">Franja</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={formik.values.franjas}
              onChange={formik.handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
                  {selected.map((value: any) => {
                    const franja = menuFranjas.find(e => e.franjaId === value)
                    return (
                      <Chip key={franja?.franjaId} label={franjasToValue(franja!.franjaId)} />
                    )
                  })
                  }
                </Box>
              )}
              name="franjas"
              MenuProps={MenuProps}
            >
              {menuFranjas.map((e) => (
                <MenuItem
                  key={e.franjaId}
                  value={e.franjaId}
                // style={getStyles()}
                >
                  {franjasToValue(e.franjaId)}
                </MenuItem>
              ))}
            </Select>
            {/* Validation */}
            {formik.errors.franjas && <Typography
              color={colors.redAccent[400]}
              fontWeight="600"
              fontStyle="italic"
              sx={{ ml: "5px" }}
              variant="h5"
            >
              {formik.errors.franjas}
            </Typography>
            }
            <DialogActions>
              <IconButton type='submit'>
                <SaveOutlinedIcon />
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }} variant="h5">
                  Guardar
                </Typography>
              </IconButton>
              <IconButton onClick={() => {
                onResetCalendarHandler();
                onDialogHidden()
                formik.resetForm();
              }}>
                <ExitToAppOutlinedIcon />
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }} variant="h5">
                  Salir
                </Typography>
              </IconButton>
            </DialogActions>
          </FormControl>
        </Box>
        : <CreateScheduleLoader />
      }
    </DialogContent >
  </>

  let dialogLoader = <DialogContent>
    <CreateScheduleLoader />
    <Box display="flex" justifyContent="center">
      <Typography variant='h3'>Insertando...</Typography>
    </Box>
  </DialogContent>

  return (
    <Dialog
      fullWidth={true}
      open={dialogVisible}
      onClose={onDialogHidden}
      sx={dialogLoader && {
        "& .MuiDialogTitle-root": {
          paddingBottom: 1
        },
        "& .MuiDialogContent-root": {
          height: "25vh",
          display: "flex",
          flexDirection: 'column-reverse',
        }
      }}
    >
      {newScheduleLoader
        ? dialogLoader
        : dialogInfo
      }
    </Dialog >
  )
}

export default ScheduleDialog

