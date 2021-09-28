import MaterialTable, { Column } from '@material-table/core';
import {
  IconButton,
  Collapse,
  Grid,
  makeStyles,
  useTheme,
  Tooltip,
  Switch,
  FormControlLabel,
  useMediaQuery,
} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import ViewIcon from '@material-ui/icons/Visibility';
import clsx from 'clsx';
import generateScheduledEventFilter from 'filters/scheduledEvent/scheduledEventsFilter';
import moment, { Moment } from 'moment';
import 'moment/locale/en-gb';
import React, { useState, useMemo, useContext, useEffect } from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  View,
} from 'react-big-calendar';

import Loader from 'components/common/Loader';
import { tableIcons } from 'components/common/TableIcons';
import EquipmentBookingDialog from 'components/equipment/EquipmentBookingDialog';
import ScheduledEventDialog, {
  SlotInfo,
} from 'components/scheduledEvent/ScheduledEventDialog';
import {
  BookingTypesMap,
  ScheduledEventStatusMap,
} from 'components/scheduledEvent/ScheduledEventForm';
import TimeSlotBookingDialog from 'components/timeSlotBooking/TimeSlotBookingDialog';
import { AppContext } from 'context/AppContext';
import {
  ScheduledEvent,
  ScheduledEventBookingType,
  GetScheduledEventsQuery,
  ProposalBooking,
} from 'generated/sdk';
import { useQuery } from 'hooks/common/useQuery';
import useEquipments from 'hooks/equipment/useEquipments';
import useUserInstruments from 'hooks/instrument/useUserInstruments';
import useInstrumentProposalBookings from 'hooks/proposalBooking/useInstrumentProposalBookings';
import useEquipmentScheduledEvents from 'hooks/scheduledEvent/useEquipmentScheduledEvents';
import useScheduledEvents from 'hooks/scheduledEvent/useScheduledEvents';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';
import { parseTzLessDateTime, toTzLessDateTime } from 'utils/date';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'styles/react-big-calendar.css';

import CalendarTodoBox from './CalendarTodoBox';
import Event, {
  CalendarScheduledEvent,
  eventPropGetter,
  getBookingTypeStyle,
  getCompletedBookingStyle,
  isCompletedEvent,
} from './Event';
import TableToolbar from './TableViewToolbar';
import Toolbar from './Toolbar';
import YearView from './YearView';

moment.locale('en-gb');

const localizer = momentLocalizer(moment);

const CALENDAR_DEFAULT_VIEW = 'week';

export type ExtendedView = View | 'year';

// NOTE: It is better practice to convert some values here for table rendering instead of using render function which adds additional complexity for sorting and stuff like that.
const transformEvent = (
  scheduledEvents: GetScheduledEventsQuery['scheduledEvents']
): CalendarScheduledEvent[] =>
  scheduledEvents.map((scheduledEvent) => ({
    id: scheduledEvent.id,
    start: parseTzLessDateTime(scheduledEvent.startsAt).toDate(),
    startTableRenderValue: toTzLessDateTime(scheduledEvent.startsAt),
    end: parseTzLessDateTime(scheduledEvent.endsAt).toDate(),
    endTableRenderValue: toTzLessDateTime(scheduledEvent.endsAt),
    title: BookingTypesMap[scheduledEvent.bookingType],
    bookingType: scheduledEvent.bookingType,
    bookingTypeTableRenderValue: BookingTypesMap[scheduledEvent.bookingType],
    equipmentId: scheduledEvent.equipmentId,
    description: scheduledEvent.description,
    proposalBooking: scheduledEvent.proposalBooking,
    instrument: scheduledEvent.instrument,
    scheduledBy: scheduledEvent.scheduledBy,
    status: scheduledEvent.status,
    statusTableRenderValue: ScheduledEventStatusMap[scheduledEvent.status],
  }));

function isOverlapping(
  { start, end }: { start: Moment; end: Moment },
  calendarEvents: CalendarScheduledEvent[]
): boolean {
  return calendarEvents.some((calendarEvent) => {
    if (
      (moment(calendarEvent.start).isSameOrAfter(start) &&
        moment(calendarEvent.end).isSameOrBefore(end)) ||
      (moment(calendarEvent.start).isBefore(end) &&
        moment(calendarEvent.end).isAfter(start))
    ) {
      return true;
    }

    return false;
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function slotPropGetter(date: Date): any {
  return {
    'data-cy': `event-slot-${date.toISOString()}`,
  };
}

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: '100%',
    position: 'relative',
  },
  relative: {
    position: 'relative',
  },
  eventDescription: {
    marginTop: 5,
  },
  collapsibleGrid: {
    overflow: 'hidden',
  },
  collapsibleGridMobile: {
    position: 'absolute',
    top: -16,
    right: -16,
    // NOTE: This calculation in height is mainly because of the different container paddings on different screen sizes
    height: `calc(100% + 32px) !important`,
    width: '200px',
    background: 'white',
    overflow: 'auto',
    boxShadow: theme.shadows[1],
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: 1000,
  },
  collapsibleGridNoWidth: {
    width: '0',
  },
  collapsibleGridTablet: {
    top: -24,
    right: -24,
    height: `calc(100% + 48px) !important`,
  },
  eventToolbarCloseButton: {
    position: 'absolute',
    right: -24,
    top: -24,
    background: theme.palette.grey[200],
    borderRadius: 0,
  },
  eventToolbarCloseButtonMobile: {
    right: 0,
    top: 0,
  },
  eventToolbarOpenButton: {
    position: 'absolute',
    right: -24,
    top: -24,
    background: theme.palette.grey[200],
    borderRadius: 0,
    zIndex: 1000,
  },
  eventToolbarOpenButtonMobile: {
    position: 'absolute',
    right: -16,
    top: -16,
    background: theme.palette.grey[200],
    borderRadius: 0,
  },
  switch: {
    paddingLeft: 10,
  },
}));

export default function Calendar() {
  const isTabletOrMobile = useMediaQuery('(max-width: 1224px)');
  const isTabletOrLarger = useMediaQuery('(min-width: 648px)');
  const [showTodoBox, setShowTodoBox] = useState<boolean>(false);
  const classes = useStyles();
  const theme = useTheme();

  const query = useQuery();
  const queryInstrument = query.get('instrument');
  const queryInstrumentId = queryInstrument ? parseInt(queryInstrument) : 0;
  const queryEquipment = query.get('equipment')?.split(',');
  const queryEquipmentNumbers = queryEquipment?.map((item) => parseInt(item));

  const { showAlert } = useContext(AppContext);
  const [selectedEvent, setSelectedEvent] = useState<
    | Pick<
        ScheduledEvent,
        'id' | 'bookingType' | 'startsAt' | 'endsAt' | 'description'
      >
    | SlotInfo
    | null
  >(null);
  const [view, setView] = useState<ExtendedView>(CALENDAR_DEFAULT_VIEW);
  const [startsAt, setStartAt] = useState(
    moment()
      .startOf(view as moment.unitOfTime.StartOf)
      .toDate()
  );
  const [isTableView, setIsTableView] = useState<boolean>(false);
  const [filter, setFilter] = useState(
    generateScheduledEventFilter(queryInstrumentId, startsAt, view)
  );
  const [selectedProposalBooking, setSelectedProposalBooking] = useState<{
    proposalBookingId: number | null;
    scheduledEventId: number | null;
  }>({ proposalBookingId: null, scheduledEventId: null });
  const [selectedEquipmentBooking, setSelectedEquipmentBooking] = useState<
    number | null
  >(null);

  const { loading: instrumentsLoading, instruments } = useUserInstruments();
  const { loading: equipmentsLoading, equipments } = useEquipments();

  useEffect(() => {
    if (isTabletOrMobile) {
      setShowTodoBox(false);
    } else {
      setShowTodoBox(true);
    }
  }, [isTabletOrMobile]);

  const {
    proposalBookings,
    loading: loadingBookings,
    refresh: refreshBookings,
  } = useInstrumentProposalBookings(queryInstrumentId);

  const {
    scheduledEvents,
    loading: loadingEvents,
    refresh: refreshEvents,
  } = useScheduledEvents(filter);

  const {
    scheduledEvents: eqEvents,
    setScheduledEvents,
    selectedEquipment,
    setSelectedEquipments,
  } = useEquipmentScheduledEvents({
    equipmentIds: queryEquipmentNumbers,
    startsAt: filter.startsAt,
    endsAt: filter.endsAt,
  });

  const equipmentEventsOnly = eqEvents.map((eqEvent) => eqEvent.events).flat(1);

  const refresh = () => {
    refreshEvents();
    refreshBookings();
  };

  useEffect(() => {
    if (!selectedEquipment && !queryEquipment) {
      setScheduledEvents([]);
    }

    if (
      selectedEquipment?.length !== queryEquipment?.length ||
      !selectedEquipment?.every((eq) => queryEquipment?.includes(eq.toString()))
    ) {
      setSelectedEquipments(queryEquipmentNumbers);
    }
  }, [
    selectedEquipment,
    queryEquipment,
    setSelectedEquipments,
    setScheduledEvents,
    queryEquipmentNumbers,
  ]);

  useEffect(() => {
    setFilter(generateScheduledEventFilter(queryInstrumentId, startsAt, view));
  }, [queryInstrumentId, startsAt, view]);

  const eqEventsTransformed: GetScheduledEventsQuery['scheduledEvents'] =
    eqEvents
      .map((eq) =>
        eq.events.map((event) => ({
          ...event,
          bookingType: ScheduledEventBookingType.EQUIPMENT,
          description: eq.name,
          proposalBooking: event.proposalBooking as ProposalBooking,
          instrument: event.instrument,
          scheduledBy: event.scheduledBy,
          equipmentId: event.equipmentId,
        }))
      )
      .flat(1);

  const calendarEvents = useMemo(
    () => transformEvent([...scheduledEvents, ...eqEventsTransformed]),
    [scheduledEvents, eqEventsTransformed]
  );
  const tableEvents = useMemo(
    () => transformEvent([...scheduledEvents, ...eqEventsTransformed]),
    [scheduledEvents, eqEventsTransformed]
  );

  const onNavigate = (newDate: Date, newView: View) => {
    setStartAt(newDate);
    setView(newView);
  };

  const onViewChange = (newView: View) => {
    setView(newView);
  };

  const onSelectSlot = (slotInfo: SlotInfo) => {
    if (
      isOverlapping(
        { start: slotInfo.start, end: slotInfo.end },
        calendarEvents
      )
    ) {
      return;
    }

    if (!queryInstrument) {
      showAlert({ message: <>You have to select an instrument</> });

      return;
    }

    setSelectedEvent(slotInfo);
  };

  const onSelecting = (range: { start: Moment; end: Moment }) => {
    return !isOverlapping(range, calendarEvents);
  };

  const closeDialog = (shouldRefresh?: boolean) => {
    setSelectedEvent(null);

    if (shouldRefresh) {
      refresh();
    }
  };

  const onSelectEvent = (selectedScheduledEvent: CalendarScheduledEvent) => {
    switch (selectedScheduledEvent.bookingType) {
      case ScheduledEventBookingType.USER_OPERATIONS: {
        const scheduledEvent = scheduledEvents.find(
          (se) => se.id === selectedScheduledEvent.id
        );

        if (scheduledEvent?.proposalBooking) {
          setSelectedProposalBooking({
            proposalBookingId: scheduledEvent.proposalBooking.id,
            scheduledEventId: scheduledEvent.id,
          });
        }
        break;
      }

      case ScheduledEventBookingType.EQUIPMENT: {
        const equipmentScheduledEvent = equipmentEventsOnly.find(
          (se) =>
            se.id === selectedScheduledEvent.id &&
            se.equipmentId === selectedScheduledEvent.equipmentId
        );

        if (equipmentScheduledEvent && equipmentScheduledEvent.equipmentId) {
          setSelectedEquipmentBooking(equipmentScheduledEvent.equipmentId);
        }
        break;
      }

      default: {
        const scheduledEvent = scheduledEvents.find(
          (se) => se.id === selectedScheduledEvent.id
        );

        if (scheduledEvent) {
          setSelectedEvent(scheduledEvent);
        }
        break;
      }
    }
  };

  const handleNewSimpleEvent = () => {
    const start = moment().startOf('hour');
    const end = moment().startOf('hour').add(1, 'hour');

    setSelectedEvent({
      action: 'click',
      start,
      end,
      slots: [start, end],
    });
  };

  const handleCloseDialog = (shouldRefresh?: boolean) => {
    setSelectedProposalBooking({
      scheduledEventId: null,
      proposalBookingId: null,
    });
    setSelectedEquipmentBooking(null);

    if (shouldRefresh) {
      refresh();
    }
  };

  const columns: Column<CalendarScheduledEvent>[] = [
    {
      title: 'Booking type',
      field: 'bookingTypeTableRenderValue',
    },
    {
      title: 'Starts at',
      field: 'startTableRenderValue',
    },
    {
      title: 'Ends at',
      field: 'endTableRenderValue',
    },
    { title: 'Description', field: 'description' },
    { title: 'Status', field: 'statusTableRenderValue' },
    { title: 'Instrument', field: 'instrument.name' },
    { title: 'Proposal', field: 'proposalBooking.proposal.title' },
    { title: 'Proposal ID', field: 'proposalBooking.proposal.proposalId' },
  ];

  const ViewTableRowIcon = (rowData: CalendarScheduledEvent) => (
    <ViewIcon
      style={{
        ...getBookingTypeStyle(rowData.bookingType, rowData.status),
        backgroundColor: 'inherit',
      }}
    />
  );

  // 100% height needed for month view
  // also the other components make whole page scrollable without it
  return (
    <ContentContainer
      maxWidth={false}
      className={!isTableView ? classes.fullHeight : ''}
    >
      <Grid container className={classes.fullHeight}>
        <Grid item xs={12} className={classes.fullHeight}>
          <StyledPaper
            margin={[0, 1]}
            className={clsx(classes.fullHeight, classes.relative)}
          >
            {queryInstrument && (
              <ScheduledEventDialog
                selectedEvent={selectedEvent}
                selectedInstrumentId={queryInstrumentId}
                isDialogOpen={selectedEvent !== null}
                closeDialog={closeDialog}
              />
            )}
            {selectedProposalBooking.proposalBookingId !== null &&
              selectedProposalBooking.scheduledEventId !== null && (
                <TimeSlotBookingDialog
                  activeTimeSlotScheduledEventId={
                    selectedProposalBooking.scheduledEventId
                  }
                  activeProposalBookingId={
                    selectedProposalBooking.proposalBookingId
                  }
                  isDialogOpen={true}
                  closeDialog={handleCloseDialog}
                />
              )}
            {selectedEquipmentBooking !== null && (
              <EquipmentBookingDialog
                activeEquipmentBookingId={selectedEquipmentBooking}
                isDialogOpen={true}
                closeDialog={handleCloseDialog}
              />
            )}
            <Grid container className={classes.fullHeight}>
              {!showTodoBox && (
                <Tooltip title="Open event toolbar">
                  <IconButton
                    onClick={() => setShowTodoBox(true)}
                    aria-label="Open event toolbar"
                    className={
                      isTabletOrLarger
                        ? classes.eventToolbarOpenButton
                        : classes.eventToolbarOpenButtonMobile
                    }
                    size="small"
                    data-cy="open-event-toolbar"
                  >
                    <ChevronLeft />
                  </IconButton>
                </Tooltip>
              )}
              <Grid
                item
                xs={isTabletOrMobile ? 12 : showTodoBox ? 10 : 12}
                className={classes.fullHeight}
                style={{
                  transition: theme.transitions.create('all', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
                }}
              >
                {!isTableView && (
                  // @ts-expect-error test
                  <BigCalendar
                    selectable
                    // TODO: needs some position fixing
                    // popup
                    localizer={localizer}
                    events={calendarEvents}
                    defaultView={view}
                    views={{
                      day: true,
                      week: true,
                      month: true,
                      year: YearView,
                    }}
                    defaultDate={startsAt}
                    step={60}
                    timeslots={1}
                    showMultiDayTimes={true}
                    dayLayoutAlgorithm={'no-overlap'}
                    eventPropGetter={eventPropGetter}
                    slotPropGetter={slotPropGetter}
                    onSelectEvent={onSelectEvent}
                    onSelectSlot={onSelectSlot}
                    onSelecting={onSelecting}
                    onNavigate={onNavigate}
                    onView={onViewChange}
                    // TODO: This should be adjustable length but for now it is fixed amount of 3 months
                    messages={{ year: '3 months' }}
                    components={{
                      toolbar: (toolbarProps) =>
                        Toolbar({
                          ...toolbarProps,
                          instruments,
                          instrumentsLoading,
                          equipments,
                          equipmentsLoading,
                        }),
                      event: Event,
                      header: ({ date, localizer }) => {
                        switch (view) {
                          case 'year':
                            return localizer.format(date, 'ddd DD MMM', '');
                          case 'week':
                            return localizer.format(date, 'dddd', '');
                          case 'month':
                            return localizer.format(date, 'dddd', '');

                          default:
                            return '';
                        }
                      },
                    }}
                  />
                )}
                {isTableView && (
                  <div data-cy="scheduled-events-table">
                    <MaterialTable
                      icons={tableIcons}
                      title="Scheduled events"
                      columns={columns}
                      data={tableEvents}
                      components={{
                        Toolbar: (data) =>
                          TableToolbar(
                            data,
                            filter,
                            setFilter,
                            instruments,
                            instrumentsLoading,
                            equipments,
                            equipmentsLoading
                          ),
                      }}
                      options={{
                        rowStyle: (rowData: CalendarScheduledEvent) => {
                          const eventStyle = isCompletedEvent({
                            status: rowData.status,
                          })
                            ? getCompletedBookingStyle()
                            : getBookingTypeStyle(
                                rowData.bookingType,
                                rowData.status
                              );

                          return eventStyle;
                        },
                        pageSize: 10,
                      }}
                      actions={[
                        (rowData) => ({
                          icon: () => ViewTableRowIcon(rowData),
                          tooltip: 'View event',
                          onClick: (_event, rowData) => {
                            onSelectEvent(rowData as CalendarScheduledEvent);
                          },
                          position: 'row',
                        }),
                      ]}
                    />
                  </div>
                )}
              </Grid>
              <Grid
                item
                xs
                className={`${classes.collapsibleGrid} ${
                  isTabletOrMobile && classes.collapsibleGridMobile
                } ${isTabletOrLarger && classes.collapsibleGridTablet}
                ${!showTodoBox && classes.collapsibleGridNoWidth}`}
              >
                <Collapse in={showTodoBox} data-cy="collapsible-event-toolbar">
                  {showTodoBox && (
                    <Tooltip title="Close event toolbar">
                      <IconButton
                        onClick={() => setShowTodoBox(false)}
                        aria-label="Close event toolbar"
                        className={`
                          ${classes.eventToolbarCloseButton}
                          ${
                            isTabletOrMobile &&
                            classes.eventToolbarCloseButtonMobile
                          }
                        `}
                        size="small"
                        data-cy="close-event-toolbar"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <FormControlLabel
                    className={classes.switch}
                    control={
                      <Switch
                        checked={isTableView}
                        data-cy="toggle-table-view"
                        onChange={() => {
                          setIsTableView(!isTableView);
                        }}
                        color="primary"
                      />
                    }
                    label="Table view"
                  />
                  <CalendarTodoBox
                    refreshCalendar={refresh}
                    onNewSimpleEvent={handleNewSimpleEvent}
                    proposalBookings={proposalBookings}
                  />
                </Collapse>
              </Grid>
            </Grid>
            {(loadingEvents || loadingBookings) && <Loader />}
          </StyledPaper>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
