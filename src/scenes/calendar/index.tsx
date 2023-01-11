import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import {
  DateSelectArg,
  EventApi,
  EventClickArg,
  formatDate,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import esLocale from "@fullcalendar/core/locales/es";
import ScheduleDialog from "../../components/ScheduleDialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { franjasToTitle } from "../../helpers/franjasToTitle";
import { respInfoReceived } from "../../example";
import CreateScheduleLoader from "../../components/Loader/createScheduleLoader";

export interface CalendarFormSendInterface {
  idUser: string;
  startStr: string;
  endStr: string;
  franjas: string[];
}

const validationSchema = yup.object().shape({
  franjas: yup
    .array()
    .min(1, "Porfavor, asegurate de ingresar al menos una franja"),
});

const dummyDataSchedule: respInfoReceived = [
  {
    id: "a1", //id schedule
    franjaId: "0", //id franja
    date: "2022-12-09", //date
    taken: true, //schedule state
  },
  {
    id: "b1", //id schedule
    franjaId: "1", //id franja
    date: "2022-12-09", //date
    taken: false, //schedule state
  },
];

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [dialogVisible, setDialogIsVisible] = useState(false);
  const [franjaName, setFranjaName] = useState<string[]>([]);
  const [calendarForm, setCalendarForm] = useState<CalendarFormSendInterface>({
    idUser: "",
    startStr: "",
    endStr: "",
    franjas: [],
  });
  const [selectedState, setSelectedState] = useState<DateSelectArg>();
  const [newScheduleLoader, setNewScheduleLoader] = useState(false);
  const [schedule, setSchedule] = useState<respInfoReceived>([]);
  const [loader, setLoader] = useState(true);

  const resetCalendarHandler = () => {
    setCalendarForm({
      idUser: "",
      startStr: "",
      endStr: "",
      franjas: [],
    });
  };

  const replaceAt = (value: string, index: number, replacement: string) => {
    return (
      value.substring(0, index) +
      replacement +
      value.substring(index + replacement.length)
    );
  };

  const handleChange = (event: SelectChangeEvent<typeof franjaName>) => {
    const {
      target: { value },
    } = event;
    setFranjaName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const formik = useFormik({
    initialValues: {
      franjas: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setNewScheduleLoader(true);
      const { franjas } = values;
      const obj1 = { ...calendarForm, franjas };
      const value2 = +obj1.startStr[9] + 1;
      const obj2 = {
        ...calendarForm,
        startStr: replaceAt(obj1.startStr, 9, value2 + ""),
        franjas,
      };
      const value3 = +obj2.startStr[9] + 1;
      const obj3 = {
        ...calendarForm,
        startStr: replaceAt(obj2.startStr, 9, value3 + ""),
        franjas,
      };
      const value4 = +obj3.startStr[9] + 1;
      const obj4 = {
        ...calendarForm,
        startStr: replaceAt(obj3.startStr, 9, value4 + ""),
        franjas,
      };
      const arr = [obj1, obj2, obj3, obj4];
      const calendarAPI = selectedState?.view.calendar;
      calendarAPI?.unselect();
      console.log(arr);
      arr.map((e, _) => {
        e.franjas.map((x: string) => {
          setTimeout(() => {
            calendarAPI?.addEvent({
              id: Math.random() + "",
              title: franjasToTitle(x),
              date: e.startStr,
              franjaId: x,
              taken: false,
            });
          }, 2000);
        });
      });
      setTimeout(() => {
        dialogHiddenHandler();
        setNewScheduleLoader(false);
        resetCalendarHandler();
        formik.resetForm();
      }, 3000);
      // Espero recibir info de jose con id
      // setNewScheduleLoader(true);
      // const obj1 = { ...calendarForm, taken: false, franjas, }
      // const obj2 = { ...calendarForm, taken: false, franjas }
      // console.log(obj1);

      // [obj1].map((e, _) => {
      //   e.franjas.map(x => {
      //     setTimeout(() => {
      //       calendarAPI?.addEvent({
      //         id: Math.random() + "",
      //         title: franjasToTitle(x),
      //         date: e.startStr,
      //         franjaId: x,
      //         taken: false
      //       });
      //     }, 2000);
      //   })
      // })
      // setTimeout(() => {
      //   dialogHiddenHandler();
      //   setNewScheduleLoader(false);
      //   resetCalendarHandler();
      //   formik.resetForm();
      // }, 3000)
    },
  });

  const dialogVisibleHandler = () => {
    setDialogIsVisible(true);
  };
  const dialogHiddenHandler = () => {
    setDialogIsVisible(false);
  };

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedState(selected);
    const { startStr, endStr } = selected;
    setCalendarForm((prevState) => {
      return {
        ...prevState,
        idUser: "nicolaspicon98@gmail.com",
        startStr,
        endStr,
      };
    });
    dialogVisibleHandler();
    console.log(calendarForm);
    // const obj = {
    //   idUser: "nicolaspicon98@gmail.com",
    //   startStr,
    //   endStr,
    //   franjas: franjaName
    // }
    // console.log(obj);
    // const title = prompt("Please enter a new title for your event");
    // const calendarApi = selected.view.calendar;
    // console.log(selected)
    // calendarApi.unselect();

    // if (title) {
    //   calendarApi.addEvent({
    //     id: `${selected.startStr}-${title}`,
    //     title,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     allDay: selected.allDay,
    //   });
    // }
  };

  const handleEventClick = (selected: EventClickArg) => {
    //id de horario (date - franja)
    if (selected.event.extendedProps.taken) {
      alert(
        "Lo sentimos, esa franja ya fue tomada. Si desea cancelar la cita con el estudiante, puede hacerlo en la seccion de citas"
      );
      return;
    }
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  let calendarHTML = (
    <FullCalendar
      height="75vh"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      headerToolbar={{
        left: "",
        center: "title",
        right: "dayGridMonth,listMonth",
      }}
      locale={esLocale}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleDateClick}
      eventClick={handleEventClick}
      eventsSet={(events) => setCurrentEvents(events)}
      initialEvents={schedule}
    />
  );

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    const resp = dummyDataSchedule;
    setSchedule(
      resp.map((e) => {
        return {
          ...e,
          id: e.id,
          title: franjasToTitle(e.franjaId),
          date: e.date,
          franjaId: e.franjaId,
        };
      })
    );
  }, []);

  // console.log(schedule)
  // if(selectedState) console.log(selectedState.view.calendar.getEvents());

  return (
    <Box m="20px">
      <Header
        title="Calendario Citas"
        subtitle="Maneja el horario de tus citas"
      />
      {loader ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="75vh"
          flexDirection="column"
        >
          <CreateScheduleLoader loadingText="Cargando Horarios..." />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between">
            {/* CALENDAR SIDEBAR */}
            <Box
              flex="1 1 20%"
              bgcolor={colors.primary[400]}
              p="15px"
              borderRadius="4px"
            >
              <Typography variant="h5">Events</Typography>
              <List>
                {currentEvents!.map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                      margin: "10px 0",
                      borderRadius: "2px",
                    }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Typography>
                          {formatDate(event.start!, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          {formatDate(event.end!, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* CALENDAR */}
            <Box flex="1 1 100%" ml="15px">
              {calendarHTML}
            </Box>
          </Box>
          <ScheduleDialog
            franjaName={franjaName}
            dialogVisible={dialogVisible}
            onDialogHidden={dialogHiddenHandler}
            handleChange={handleChange}
            formik={formik}
            onResetCalendarHandler={resetCalendarHandler}
            newScheduleLoader={newScheduleLoader}
            selectedState={selectedState!}
            schedule={schedule!}
          />
        </>
      )}
    </Box>
  );
};

export default Calendar;
