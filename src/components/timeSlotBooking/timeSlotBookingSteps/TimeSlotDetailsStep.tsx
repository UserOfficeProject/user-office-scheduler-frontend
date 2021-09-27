import MomentUtils from '@date-io/moment';
import { getTranslation, ResourceId } from '@esss-swap/duo-localisation';
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import {
  CalendarToday as CalendarTodayIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Save as SaveIcon,
  People as PeopleIcon,
  FolderOpen as FolderOpenIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
  Edit,
} from '@material-ui/icons';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import clsx from 'clsx';
import humanizeDuration from 'humanize-duration';
import moment, { Moment } from 'moment';
import { useSnackbar } from 'notistack';
import React, { useContext, useMemo, useState } from 'react';

import IdentifierIcon from 'components/common/icons/IdentifierIcon';
import Loader from 'components/common/Loader';
import { AppContext } from 'context/AppContext';
import { ProposalBooking, ProposalBookingStatus } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';
import {
  toTzLessDateTime,
  TZ_LESS_DATE_TIME_LOW_PREC_FORMAT,
} from 'utils/date';
import { hasOverlappingEvents } from 'utils/scheduledEvent';

import { TimeSlotBookingDialogStepProps } from '../TimeSlotBookingDialog';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    marginLeft: theme.spacing(6),
  },
  allocatablePositive: {
    color: theme.palette.success.main,
  },
  allocatableNegative: {
    color: theme.palette.error.main,
  },
  flexColumn: {
    flexGrow: 1,
    maxWidth: '100%',
    flexBasis: 0,
    alignSelf: 'flex-start',
  },
  spacingLeft: {
    marginLeft: theme.spacing(2),
  },
  smaller: {
    fontSize: '0.875rem',
  },
  editIcon: {
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
    position: 'absolute',
  },
}));

const formatDuration = (durSec: number) =>
  humanizeDuration(durSec * 1000, {
    conjunction: ' and ',
    serialComma: false,
    largest: 3,
  });

export default function TimeSlotDetailsStep({
  activeStatus,
  scheduledEvent,
  setScheduledEvent,
  isDirty,
  handleNext,
  handleSetDirty,
  handleCloseDialog,
}: TimeSlotBookingDialogStepProps) {
  const proposalBooking = scheduledEvent.proposalBooking as ProposalBooking;
  const [editingStartDate, setEditingStartDate] = useState(false);
  const [editingEndDate, setEditingEndDate] = useState(false);
  const [showStartsAtEditIcon, setShowStartsAtEditIcon] = useState(false);
  const [showEndsAtEditIcon, setShowEndsAtEditIcon] = useState(false);

  const isStepReadOnly = activeStatus !== ProposalBookingStatus.DRAFT;

  const classes = useStyles();

  const { showAlert, showConfirmation } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const api = useDataApi();
  const [isLoading, setIsLoading] = useState(false);
  const [startsAt, setStartsAt] = useState<Moment | null>(
    moment(scheduledEvent.startsAt)
  );
  const [endsAt, setEndsAt] = useState<Moment | null>(
    moment(scheduledEvent.endsAt)
  );

  const handleOnSave = () => {
    if (!startsAt || !endsAt || !startsAt.isValid() || !endsAt.isValid()) {
      // when the value is empty or invalid it is quite obvious why we prevent save
      return;
    }

    if (startsAt >= endsAt) {
      // when the starting date is after ending date
      // it may be less obvious for the user, show alert
      showAlert({
        message: 'The starting date needs to be before the ending date',
      });

      return;
    }

    !isDirty && handleSetDirty(true);

    setScheduledEvent({
      ...scheduledEvent,
      startsAt: toTzLessDateTime(startsAt),
      endsAt: toTzLessDateTime(endsAt),
    });

    setEditingStartDate(false);
    setEditingEndDate(false);
  };

  const { allocated, allocatable } = useMemo(() => {
    const allocated = proposalBooking.scheduledEvents.reduce(
      (total, curr) =>
        total + moment(curr.endsAt).diff(curr.startsAt, 'seconds'),
      0
    );

    return {
      allocated,
      allocatable: proposalBooking.allocatedTime - allocated,
    };
  }, [proposalBooking]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (!startsAt || !endsAt) {
        return;
      }

      const {
        updateScheduledEvent: { error, scheduledEvent: updatedScheduledEvent },
      } = await api().updateScheduledEvent({
        input: {
          scheduledEventId: scheduledEvent.id,
          startsAt: toTzLessDateTime(startsAt),
          endsAt: toTzLessDateTime(endsAt),
        },
      });
      if (error) {
        enqueueSnackbar(getTranslation(error as ResourceId), {
          variant: 'error',
        });
      } else {
        updatedScheduledEvent &&
          setScheduledEvent({
            ...scheduledEvent,
            startsAt: updatedScheduledEvent.startsAt,
            endsAt: updatedScheduledEvent.endsAt,
          });
      }
      handleSetDirty(false);
    } catch (e) {
      // TODO
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getProposalBookingEventsForOverlapCheck = () =>
    proposalBooking.scheduledEvents.map((event) => {
      if (event.id === scheduledEvent.id && startsAt && endsAt) {
        return {
          id: event.id,
          startsAt: startsAt,
          endsAt: endsAt,
        };
      } else {
        return {
          id: event.id,
          startsAt: moment(event.startsAt),
          endsAt: moment(event.endsAt),
        };
      }
    });

  const handleSaveDraft = () => {
    hasOverlappingEvents(getProposalBookingEventsForOverlapCheck())
      ? showConfirmation({
          message: (
            <>
              You have <strong>overlapping bookings</strong>, are you sure you
              want to continue?
            </>
          ),
          cb: handleSubmit,
        })
      : handleSubmit();
  };

  const saveAndContinue = async () => {
    await handleSubmit();
    handleNext();
  };

  const handleSaveAndContinue = async () => {
    hasOverlappingEvents(getProposalBookingEventsForOverlapCheck())
      ? showConfirmation({
          message: (
            <>
              You have <strong>overlapping bookings</strong>, are you sure you
              want to continue?
            </>
          ),
          cb: saveAndContinue,
        })
      : saveAndContinue();
  };

  return (
    <>
      {isLoading && <Loader />}

      <DialogContent>
        <Grid container spacing={2}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid item xs={6}>
              <List className={classes.list} dense>
                <ListItem disableGutters>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarTodayIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {!editingStartDate && (
                    <>
                      <ListItemText
                        onClick={() => setEditingStartDate(!isStepReadOnly)}
                        onMouseOver={() =>
                          setShowStartsAtEditIcon(!isStepReadOnly)
                        }
                        onMouseLeave={() => setShowStartsAtEditIcon(false)}
                        primary="Starts at"
                        data-cy="startsAtInfo"
                        secondary={
                          <>
                            {toTzLessDateTime(startsAt as Moment)}
                            {showStartsAtEditIcon && (
                              <Edit
                                fontSize="small"
                                className={classes.editIcon}
                              />
                            )}
                          </>
                        }
                      />
                    </>
                  )}
                  {editingStartDate && (
                    <>
                      <KeyboardDateTimePicker
                        required
                        label="Starts at"
                        name={`startsAt`}
                        margin="none"
                        size="small"
                        format={TZ_LESS_DATE_TIME_LOW_PREC_FORMAT}
                        ampm={false}
                        minutesStep={60}
                        fullWidth
                        data-cy="startsAt"
                        InputProps={{
                          className: classes.smaller,
                        }}
                        value={startsAt}
                        onChange={(newValue) => setStartsAt(newValue)}
                      />
                      <IconButton
                        onClick={handleOnSave}
                        data-cy="btn-time-table-save-row"
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setStartsAt(moment(scheduledEvent.startsAt));
                          setEditingStartDate(false);
                        }}
                        data-cy="btn-time-table-reset-row"
                      >
                        <ClearIcon />
                      </IconButton>
                    </>
                  )}
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  className={classes.divider}
                />
                <ListItem disableGutters>
                  <ListItemAvatar>
                    <Avatar>
                      <PeopleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Scheduled by"
                    secondary={`${scheduledEvent.scheduledBy?.firstname} ${scheduledEvent.scheduledBy?.lastname}`}
                  />
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  className={classes.divider}
                />
                <ListItem disableGutters>
                  <ListItemAvatar>
                    <Avatar>
                      <HourglassEmptyIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Proposal allocated time"
                    secondary={formatDuration(allocated)}
                    className={classes.flexColumn}
                  />
                  <ListItemText
                    primary="Proposal allocatable time"
                    className={classes.flexColumn}
                    secondary={
                      <>
                        <span
                          className={clsx({
                            [classes.allocatablePositive]: allocatable > 0,
                            [classes.allocatableNegative]: allocatable < 0,
                          })}
                        >
                          {allocatable < 0
                            ? `0 seconds (+${formatDuration(allocatable)})`
                            : formatDuration(allocatable)}
                        </span>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6}>
              <List className={classes.list} dense>
                <ListItem disableGutters>
                  <ListItemAvatar>
                    <Avatar>
                      <HourglassEmptyIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {!editingEndDate && (
                    <ListItemText
                      primary="Ends at"
                      data-cy="endsAtInfo"
                      onMouseOver={() => setShowEndsAtEditIcon(!isStepReadOnly)}
                      onMouseLeave={() => setShowEndsAtEditIcon(false)}
                      onClick={() => setEditingEndDate(!isStepReadOnly)}
                      secondary={
                        <>
                          {toTzLessDateTime(endsAt as Moment)}
                          {showEndsAtEditIcon && (
                            <Edit
                              fontSize="small"
                              className={classes.editIcon}
                            />
                          )}
                        </>
                      }
                    />
                  )}
                  {editingEndDate && (
                    <>
                      <KeyboardDateTimePicker
                        required
                        label="Ends at"
                        name="endsAt"
                        margin="none"
                        size="small"
                        format={TZ_LESS_DATE_TIME_LOW_PREC_FORMAT}
                        ampm={false}
                        minutesStep={60}
                        fullWidth
                        data-cy="endsAt"
                        InputProps={{
                          className: classes.smaller,
                        }}
                        value={endsAt}
                        onChange={(newValue) => setEndsAt(newValue)}
                      />
                      <IconButton
                        onClick={handleOnSave}
                        data-cy="btn-time-table-save-row"
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setEndsAt(moment(scheduledEvent.endsAt));
                          setEditingEndDate(false);
                        }}
                        data-cy="btn-time-table-reset-row"
                      >
                        <ClearIcon />
                      </IconButton>
                    </>
                  )}
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  className={classes.divider}
                />
                <ListItem disableGutters>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderOpenIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Proposal title"
                    secondary={proposalBooking.proposal?.title}
                  />
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  className={classes.divider}
                />
                <ListItem disableGutters>
                  <ListItemAvatar>
                    <Avatar>
                      <IdentifierIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Proposal ID"
                    secondary={proposalBooking.proposal?.proposalId}
                  />
                </ListItem>
              </List>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          color="primary"
          onClick={handleCloseDialog}
          data-cy="btn-close-event-dialog"
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSaveDraft}
          data-cy="btn-save"
          disabled={isStepReadOnly || editingStartDate || editingEndDate}
        >
          Save draft
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAndContinue}
          data-cy="btn-next"
          disabled={isStepReadOnly || editingStartDate || editingEndDate}
        >
          Save and continue
        </Button>
      </DialogActions>
    </>
  );
}