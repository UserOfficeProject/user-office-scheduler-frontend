import {
  Typography,
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
  Table as MuiTable,
} from '@material-ui/core';
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';

import {
  ScheduledEventWithEquipments,
  ScheduledEventEquipment,
} from 'hooks/scheduledEvent/useScheduledEventsWithEquipments';

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
                    <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                      No records to show
                    </TableCell>
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

export default function TimeSlotEquipmentTable({
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
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                No records to show
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
