import MomentUtils from '@date-io/moment';
import { getTranslation, ResourceId } from '@esss-swap/duo-localisation';
import MaterialTable, {
  Column,
  EditComponentProps,
} from '@material-table/core';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment, { Moment } from 'moment';
import { useSnackbar } from 'notistack';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { tableIcons } from 'components/common/TableIcons';
import { ProposalBookingStatusCore } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';
import { ProposalBookingLostTime } from 'hooks/lostTime/useProposalBookingLostTimes';
import { ScheduledEventWithEquipments } from 'hooks/scheduledEvent/useScheduledEventWithEquipment';
import {
  toTzLessDateTime,
  TZ_LESS_DATE_TIME_LOW_PREC_FORMAT,
} from 'utils/date';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 0, 0),

    '& .MuiToolbar-root button.MuiIconButton-root': {
      backgroundColor: 'unset !important',
      padding: 0,
    },
  },
  spacingLeft: {
    marginLeft: theme.spacing(2),
  },
}));

type TimeSlotLostTimeTableProps = {
  scheduledEvent: ScheduledEventWithEquipments;
  handleSetDirty: (isDirty: boolean) => void;
  lostTimes: ProposalBookingLostTime[];
  setLostTimes: Dispatch<SetStateAction<ProposalBookingLostTime[]>>;
  loading: boolean;
};

function TimeSlotLostTimeTable({
  scheduledEvent,
  handleSetDirty,
  loading,
  lostTimes,
  setLostTimes,
}: TimeSlotLostTimeTableProps) {
  const isStepReadOnly =
    scheduledEvent.status === ProposalBookingStatusCore.COMPLETED;

  const classes = useStyles();
  const api = useDataApi();
  const { enqueueSnackbar } = useSnackbar();
  const [isAddingNewLostTime, setIsAddingNewLostTime] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (!scheduledEvent.proposalBooking) {
      return;
    }

    setIsAddingNewLostTime(true);
    handleSetDirty(false);
    try {
      setIsLoading(true);

      const newLostTimeStart = lostTimes.length
        ? moment(lostTimes[lostTimes.length - 1].endsAt).startOf('hour')
        : moment().startOf('hour');
      const newLostTimeEnd = lostTimes.length
        ? moment(lostTimes[lostTimes.length - 1].endsAt)
            .startOf('hour')
            .add(1, 'hour')
        : moment().startOf('hour').add(1, 'hour');

      const {
        addLostTime: { error, lostTime: addedLostTime },
      } = await api().addLostTime({
        input: {
          proposalBookingId: scheduledEvent.proposalBooking.id,
          lostTime: {
            scheduledEventId: scheduledEvent.id,
            startsAt: toTzLessDateTime(newLostTimeStart),
            endsAt: toTzLessDateTime(newLostTimeEnd),
          },
        },
      });

      if (error) {
        enqueueSnackbar(getTranslation(error as ResourceId), {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('Lost time added', {
          variant: 'success',
        });
        addedLostTime && setLostTimes([...lostTimes, addedLostTime]);
      }
    } catch (e) {
      // TODO
      console.error(e);
    } finally {
      setIsLoading(false);
    }
    setIsAddingNewLostTime(false);
  };

  const handleRowDelete = async (data: ProposalBookingLostTime) => {
    const {
      deleteLostTime: { error, lostTime: deletedLostTime },
    } = await api().deleteLostTime({
      input: {
        id: data.id,
      },
    });

    if (error) {
      enqueueSnackbar(getTranslation(error as ResourceId), {
        variant: 'error',
      });
    } else {
      enqueueSnackbar('Lost time deleted', {
        variant: 'success',
      });
      if (deletedLostTime) {
        const updatedLostTimes = lostTimes.filter(
          (lostTime) => lostTime.id !== deletedLostTime.id
        );
        setLostTimes(updatedLostTimes);
      }
    }
  };

  const handleRowUpdate = async (data: ProposalBookingLostTime) => {
    handleSetDirty(false);

    const {
      updateLostTime: { error, lostTime: updatedLostTime },
    } = await api().updateLostTime({
      input: {
        id: data.id,
        startsAt: toTzLessDateTime(data.startsAt),
        endsAt: toTzLessDateTime(data.endsAt),
      },
    });

    if (error) {
      enqueueSnackbar(getTranslation(error as ResourceId), {
        variant: 'error',
      });
    } else {
      enqueueSnackbar('Lost time updated', {
        variant: 'success',
      });
      if (updatedLostTime) {
        const updatedLostTimes = lostTimes.map((lostTime) =>
          lostTime.id === updatedLostTime.id ? updatedLostTime : lostTime
        );
        setLostTimes(updatedLostTimes);
      }
    }

    setIsLoading(false);
  };

  const columns: Column<ProposalBookingLostTime>[] = [
    {
      title: 'Starts at',
      field: 'startsAt',
      editComponent: (props) => (
        <MuiPickersUtilsProvider utils={MomentUtils}>
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
            value={props.value}
            onChange={(value: Moment | null) => {
              handleSetDirty(true);
              props.onChange(value);
            }}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: 'Ends at',
      field: 'endsAt',
      validate: (data) => {
        if (moment(data.startsAt).isSameOrAfter(moment(data.endsAt))) {
          return {
            isValid: false,
            helperText: 'End date should be after start date',
          };
        } else {
          return {
            isValid: true,
            helperText: '',
          };
        }
      },
      editComponent: (
        props: EditComponentProps<ProposalBookingLostTime> & {
          helperText?: string;
        }
      ) => (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDateTimePicker
            required
            label="Ends at"
            name={`endsAt`}
            margin="none"
            size="small"
            format={TZ_LESS_DATE_TIME_LOW_PREC_FORMAT}
            ampm={false}
            minutesStep={60}
            fullWidth
            error={props.error}
            helperText={props.helperText}
            data-cy="endsAt"
            value={props.value}
            onChange={(value: Moment | null) => {
              handleSetDirty(true);
              props.onChange(value);
            }}
          />
        </MuiPickersUtilsProvider>
      ),
    },
  ];

  return (
    <div className={classes.root} data-cy="time-slot-lost-times-table">
      <MaterialTable
        icons={tableIcons}
        title="Lost times"
        isLoading={loading || isLoading}
        columns={columns}
        data={lostTimes}
        options={{
          search: false,
          paging: false,
        }}
        editable={
          !isStepReadOnly
            ? {
                onRowUpdate: handleRowUpdate,
                onRowUpdateCancelled: () => handleSetDirty(false),
                onRowDelete: handleRowDelete,
              }
            : {}
        }
        actions={[
          {
            icon: () => (
              <Button
                variant="contained"
                color="primary"
                component="span"
                data-cy="btn-add-lost-time"
                startIcon={
                  isAddingNewLostTime ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <AddIcon />
                  )
                }
                disabled={isAddingNewLostTime}
              >
                Add lost time
              </Button>
            ),
            disabled: isAddingNewLostTime,
            hidden: isStepReadOnly,
            onClick: handleAdd,
            isFreeAction: true,
            tooltip: 'Add lost time',
          },
        ]}
      />
    </div>
  );
}

export default React.memo(TimeSlotLostTimeTable);