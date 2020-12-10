import {
  DialogContent,
  Typography,
  DialogActions,
  Button,
  makeStyles,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  TableHead,
  TableBody,
  TableContainer,
  Paper,
  Dialog,
  Table as MuiTable,
} from '@material-ui/core';
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  DoneAll as DoneAllIcon,
} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, useContext } from 'react';

import Loader from 'components/common/Loader';
import Table, { HeadCell } from 'components/common/Table';
import { AppContext } from 'context/AppContext';
import { useDataApi } from 'hooks/common/useDataApi';
import useAvailableEquipments from 'hooks/equipment/useAvailableEquipments';
import { DetailedProposalBooking } from 'hooks/proposalBooking/useProposalBooking';
import useProposalBookingScheduledEvents from 'hooks/scheduledEvent/useProposalBookingScheduledEvents';
import useScheduledEventsWithEquipments, {
  ScheduledEventWithEquipments,
  ScheduledEventEquipment,
} from 'hooks/scheduledEvent/useScheduledEventsWithEquipments';
import { parseTzLessDateTime, toTzLessDateTime } from 'utils/date';

import {
  TimeTableRow,
  defaultHeadCells as timeTableHeadCells,
} from '../TimeTable';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row({
  row,
  onDeleteAssignment,
}: {
  row: ScheduledEventWithEquipments;
  onDeleteAssignment: (equipmentId: string, scheduledEventId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.startsAt}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.endsAt}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Equipments
              </Typography>
              <MuiTable size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Actions</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.equipments.map((equipment: ScheduledEventEquipment) => (
                    <TableRow key={equipment.id}>
                      <TableCell component="th" scope="row">
                        <IconButton
                          size="small"
                          onClick={() =>
                            onDeleteAssignment(equipment.id, row.id)
                          }
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell>{equipment.name}</TableCell>
                      <TableCell>{equipment.status}</TableCell>
                    </TableRow>
                  ))}
                  {row.equipments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3}>No rows </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </MuiTable>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function CollapsibleTable({
  rows,
  onDeleteAssignment,
}: {
  rows: ScheduledEventWithEquipments[];
  onDeleteAssignment: (equipmentId: string, scheduledEventId: string) => void;
}) {
  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Starts at</TableCell>
            <TableCell>Ends at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row
              key={row.id}
              row={row}
              onDeleteAssignment={onDeleteAssignment}
            />
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export type EquipmentTableRow = {
  id: string;
  name: string;
  autoAccept: boolean;
};

const defaultHeadCells: HeadCell<EquipmentTableRow>[] = [
  { id: 'name', label: 'Name' },
  {
    id: 'autoAccept',
    label: 'Auto accept',
  },
];

function SelectEquipmentDialog({
  isDialogOpen,
  proposalBooking,
  scheduledEvent,
  closeDialog,
}: {
  isDialogOpen: boolean;
  proposalBooking: DetailedProposalBooking;
  scheduledEvent: TimeTableRow;
  closeDialog: (closeAll?: boolean) => void;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const api = useDataApi();
  const { equipments, loading } = useAvailableEquipments(scheduledEvent.id);

  const handleAssign = async (ids: string[]) => {
    const {
      assignToScheduledEvents: success,
    } = await api().assignEquipmentToScheduledEvent({
      assignEquipmentsToScheduledEventInput: {
        equipmentIds: ids,
        scheduledEventId: scheduledEvent.id,
        proposalBookingId: proposalBooking.id,
      },
    });

    success
      ? enqueueSnackbar('Success', { variant: 'success' })
      : enqueueSnackbar('Failed to assign the selected time slots', {
          variant: 'error',
        });

    success && closeDialog(true);
  };

  const selectActions = [
    {
      tooltip: 'Assign equipment',
      icon: <DoneAllIcon data-cy="table-select-btn-add" />,
      onClick: handleAssign,
    },
  ];

  return (
    <Dialog open={isDialogOpen} maxWidth="md" fullWidth>
      {loading && <Loader />}
      <DialogContent>
        <Table
          selectable
          defaultOrderBy="name"
          tableTitle="Equipments"
          headCells={defaultHeadCells}
          tableContainerMaxHeight={600}
          showEmptyRows
          tooltipActions={selectActions}
          rows={equipments}
          extractKey={el => el.id}
          renderRow={row => {
            return (
              <>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  {row.autoAccept ? 'yes' : 'no'}
                </TableCell>
              </>
            );
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => closeDialog()}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function SelectTimeSlotsDialog({
  isDialogOpen,
  proposalBooking,
  closeDialog,
}: {
  isDialogOpen: boolean;
  proposalBooking: DetailedProposalBooking;
  closeDialog: () => void;
}) {
  const { loading, scheduledEvents } = useProposalBookingScheduledEvents(
    proposalBooking.id
  );
  const [rows, setRows] = useState<TimeTableRow[]>([]);
  const [
    selectedScheduledEvent,
    setSelectedScheduledEvent,
  ] = useState<TimeTableRow | null>(null);

  useEffect(() => {
    if (!loading) {
      setRows(
        scheduledEvents.map(({ startsAt, endsAt, ...rest }) => ({
          ...rest,
          startsAt: parseTzLessDateTime(startsAt),
          endsAt: parseTzLessDateTime(endsAt),
        }))
      );
    }
  }, [loading, scheduledEvents]);

  const handleCloseDialog = (closeAll?: boolean) => {
    setSelectedScheduledEvent(null);

    if (closeAll) {
      closeDialog();
    }
  };

  const AssignEquipment = ({ row }: { row: TimeTableRow }) => {
    return (
      <IconButton
        data-cy="btn-time-table-edit-row"
        onClick={() => setSelectedScheduledEvent(row)}
      >
        <AddIcon />
      </IconButton>
    );
  };

  const rowActions = [{ component: AssignEquipment }];

  return (
    <Dialog open={isDialogOpen} maxWidth="md" fullWidth>
      {loading && <Loader />}
      {isDialogOpen && selectedScheduledEvent && (
        <SelectEquipmentDialog
          isDialogOpen={true}
          closeDialog={handleCloseDialog}
          proposalBooking={proposalBooking}
          scheduledEvent={selectedScheduledEvent}
        />
      )}
      <DialogContent>
        <Table
          tableContainerMaxHeight={600}
          defaultOrderBy="startsAt"
          tableTitle="Time Slots"
          headCells={timeTableHeadCells}
          rowActions={rowActions}
          showEmptyRows
          rows={rows}
          extractKey={el => el.id}
          renderRow={row => {
            return (
              <>
                <TableCell align="left">
                  {toTzLessDateTime(row.startsAt)}
                </TableCell>
                <TableCell align="left">
                  {toTzLessDateTime(row.endsAt)}
                </TableCell>
              </>
            );
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => closeDialog()}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type EquipmentBookingStepProps = {
  proposalBooking: DetailedProposalBooking;
  isDirty: boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleSetDirty: (isDirty: boolean) => void;
};

export default function EquipmentBookingStep({
  proposalBooking,
  handleNext,
  handleBack,
}: EquipmentBookingStepProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [equipmentDialog, setEquipmentDialog] = useState(false);
  const {
    loading: scheduledEventsLoading,
    scheduledEvents,
    refresh,
  } = useScheduledEventsWithEquipments(proposalBooking.id);

  const isLoading = scheduledEventsLoading || loading;

  const handleCloseDialog = () => {
    setEquipmentDialog(false);
    refresh();
  };

  const { showConfirmation } = useContext(AppContext);
  const api = useDataApi();
  const handleDeleteAssignment = (
    equipmentId: string,
    scheduledEventId: string
  ) => {
    showConfirmation({
      message: (
        <>
          Are you sure you want to <strong>remove</strong> the selected
          equipment?
        </>
      ),
      cb: async () => {
        setLoading(true);

        const success = await api().deleteEquipmentAssignment({
          deleteEquipmentAssignmentInput: {
            equipmentId,
            scheduledEventId,
            proposalBookingId: proposalBooking.id,
          },
        });

        if (success) {
          refresh();
          setLoading(false);
          enqueueSnackbar('Removed', { variant: 'success' });
        } else {
          enqueueSnackbar('Failed to remove selected assignment', {
            variant: 'error',
          });
        }
      },
    });
  };

  return (
    <>
      {isLoading && <Loader />}

      {equipmentDialog && (
        <SelectTimeSlotsDialog
          isDialogOpen={equipmentDialog}
          proposalBooking={proposalBooking}
          closeDialog={handleCloseDialog}
        />
      )}
      <DialogContent>
        <div>
          Time Slots
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: '16px' } /*TODO: fix */}
            onClick={() => setEquipmentDialog(true)}
          >
            Book equipment
          </Button>
        </div>
        <CollapsibleTable
          rows={scheduledEvents}
          onDeleteAssignment={handleDeleteAssignment}
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          data-cy="btn-back"
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          data-cy="btn-next"
        >
          Next
        </Button>
      </DialogActions>
    </>
  );
}
