import MaterialTable, { Column } from '@material-table/core';
import { EventAvailable } from '@mui/icons-material';
import ViewIcon from '@mui/icons-material/Visibility';
import { Alert, IconButton, Tooltip, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';

import { tableIcons } from 'components/common/TableIcons';
import { AppContext } from 'context/AppContext';
import {
  ProposalBookingStatusCore,
  ScheduledEventBookingType,
  ScheduledEventFilter,
} from 'generated/sdk';

import { CalendarScheduledEventWithUniqeId } from '../CalendarViewContainer';
import { getBookingTypeStyle } from '../common/Event';
import Toolbar from '../common/Toolbar';

type TableViewProps = {
  filter: ScheduledEventFilter;
  events: CalendarScheduledEventWithUniqeId[];
  onSelectEvent: (data: CalendarScheduledEventWithUniqeId) => void;
};
const TableView: React.FC<TableViewProps> = ({
  filter,
  events,
  onSelectEvent,
}) => {
  const theme = useTheme();
  const { showConfirmation } = useContext(AppContext);
  const [selectedExperimentTimes, setSelectedExperimentTimes] = useState<
    CalendarScheduledEventWithUniqeId[]
  >([]);

  const ViewTableRowIcon = (rowData: CalendarScheduledEventWithUniqeId) => (
    <ViewIcon
      style={{
        ...getBookingTypeStyle(rowData),
        filter: 'none',
      }}
    />
  );

  /**
   * NOTE: Custom action buttons are here because when we have them inside actions on the material-table
   * and selection flag is true they are not working properly.
   */
  const RowActionButtons = (rowData: CalendarScheduledEventWithUniqeId) => (
    <Tooltip title="View event">
      <IconButton
        data-cy="view-proposal"
        onClick={() => {
          onSelectEvent(rowData as CalendarScheduledEventWithUniqeId);
        }}
        sx={{ p: theme.spacing(1) }}
      >
        {ViewTableRowIcon(rowData)}
      </IconButton>
    </Tooltip>
  );

  // NOTE: Including the action buttons as property to avoid the console warning(https://github.com/material-table-core/core/issues/286)
  const eventsWithActions = events.map((event) => ({
    ...event,
    rowActionButtons: RowActionButtons(event),
  }));

  const columns: Column<CalendarScheduledEventWithUniqeId>[] = [
    {
      title: 'Actions',
      cellStyle: { padding: 0 },
      sorting: false,
      removable: false,
      field: 'rowActionButtons',
    },
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

  const activateSelectedExperimentTimes = async (
    userOperationsExperimentsInDraftState: CalendarScheduledEventWithUniqeId[]
  ) => {
    // Activation call goes here
  };

  const onActivateSelectedExperimentTimes = () => {
    const userOperationsExperimentsInDraftState =
      selectedExperimentTimes.filter(
        (experimentTime) =>
          experimentTime.status === ProposalBookingStatusCore.DRAFT &&
          experimentTime.bookingType ===
            ScheduledEventBookingType.USER_OPERATIONS
      );

    showConfirmation({
      message: (
        <>
          Are you sure you want to <strong>activate</strong> selected events?
          {userOperationsExperimentsInDraftState.length !==
            selectedExperimentTimes.length && (
            <Alert severity="warning">
              Only &quot;DRAFT&quot; events that are of type &quot;USER
              OPERATIONS&quot; will be activated
            </Alert>
          )}
        </>
      ),
      cb: async () =>
        await activateSelectedExperimentTimes(
          userOperationsExperimentsInDraftState
        ),
    });
  };

  return (
    <div data-cy="scheduled-events-table">
      <Toolbar
        filter={filter}
        shouldIncludeCalendarNavigation
        shouldIncludeLabelText
        multipleInstruments
      />
      <MaterialTable
        icons={tableIcons}
        title="Scheduled events"
        columns={columns}
        data={eventsWithActions}
        onSelectionChange={(data) => setSelectedExperimentTimes(data)}
        options={{
          rowStyle: (rowData: CalendarScheduledEventWithUniqeId) =>
            getBookingTypeStyle(rowData),
          pageSize: 10,
          selection: true,
          headerSelectionProps: {
            inputProps: { 'aria-label': 'Select All Rows' },
          },
          selectionProps: (rowData: CalendarScheduledEventWithUniqeId) => ({
            style: {
              ...getBookingTypeStyle(rowData),
              filter: 'none',
            },
            inputProps: {
              'aria-label': `${rowData.start}-${rowData.end}-select`,
            },
          }),
        }}
        actions={[
          {
            icon: EventAvailable,
            tooltip: 'Activate selected experiment times',
            onClick: () => {
              onActivateSelectedExperimentTimes();
            },
            position: 'toolbarOnSelect',
          },
        ]}
      />
    </div>
  );
};

export default TableView;
