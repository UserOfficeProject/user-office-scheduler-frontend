import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
  IconButton,
  Box,
} from '@material-ui/core';
import {
  Comment as CommentIcon,
  CalendarToday as CalendarTodayIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
} from '@material-ui/icons';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useParams, generatePath } from 'react-router';
import { Link } from 'react-router-dom';

import Loader from 'components/common/Loader';
import { PATH_EDIT_EQUIPMENT } from 'components/paths';
import TimeTable, { TimeTableRow } from 'components/proposalBooking/TimeTable';
import useEquipment from 'hooks/equipment/useEquipment';
import useEquipmentScheduledEvents from 'hooks/scheduledEvent/useEquipmentScheduledEvents';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';
import { parseTzLessDateTime } from 'utils/date';

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    flexGrow: 0,
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    marginLeft: theme.spacing(6),
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
}));

const MaintenanceInfo = ({
  startsAt,
  endsAt,
}: {
  startsAt: string | null;
  endsAt: string | null;
}) => {
  if (startsAt && !endsAt) {
    return <>Under maintenance indefinitely</>;
  }

  if (
    startsAt &&
    endsAt &&
    parseTzLessDateTime(endsAt).diff(moment(), 'seconds') >= 0
  ) {
    return (
      <>
        {startsAt} - {endsAt}
      </>
    );
  }

  return <>Has no scheduled maintenance</>;
};

export default function ViewEquipment() {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const { loading: equipmentLoading, equipment } = useEquipment(id);
  const {
    loading: scheduledEventsLoading,
    scheduledEvents,
  } = useEquipmentScheduledEvents(id);
  const [rows, setRows] = useState<TimeTableRow[]>([]);

  useEffect(() => {
    if (!scheduledEventsLoading) {
      setRows(
        scheduledEvents.map(({ startsAt, endsAt, ...rest }) => ({
          ...rest,
          startsAt: parseTzLessDateTime(startsAt),
          endsAt: parseTzLessDateTime(endsAt),
        }))
      );
    }
  }, [scheduledEventsLoading, scheduledEvents]);

  if (equipmentLoading) {
    return <Loader container />;
  }

  if (!equipment) {
    // for now redirect
    return <div>Not found</div>;
  }

  return (
    <ContentContainer maxWidth={false}>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper margin={[0, 1]}>
            <Box display="flex" justifyContent="flex-end">
              <Link to={generatePath(PATH_EDIT_EQUIPMENT, { id })}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <List className={classes.list} dense>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar>
                        <CommentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Name" secondary={equipment?.name} />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Owner"
                      secondary={`${equipment?.owner.firstname} ${equipment?.owner.lastname}`}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List className={classes.list} dense>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar>
                        <CalendarTodayIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Maintenance"
                      secondary={
                        <MaintenanceInfo
                          startsAt={equipment.maintenanceStartsAt}
                          endsAt={equipment.maintenanceEndsAt}
                        />
                      }
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Auto accept equipment requests"
                      secondary={equipment.autoAccept ? 'Yes' : 'No'}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>

            {scheduledEventsLoading ? (
              <Loader relative spaced />
            ) : (
              <TimeTable
                rows={rows}
                titleComponent="Scheduled events assigned to the equipment"
                disableSelect
                showEmptyRows
              />
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
