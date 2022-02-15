import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import * as H from 'history';
import { debounce } from 'lodash';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { stringOrDate, Views } from 'react-big-calendar';
import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  // @ts-expect-error @types/react-calendar-timeline
  GroupRow,
  // @ts-expect-error @types/react-calendar-timeline
  RowItems,
  // @ts-expect-error @types/react-calendar-timeline
  HelpersContext,
} from 'react-calendar-timeline';
// @ts-expect-error @types/react-calendar-timeline is not updated with tle latest changes on react-calendar-timeline
import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'react-calendar-timeline/lib/Timeline.css';
import { useHistory } from 'react-router';

import { InstrumentAndEquipmentContext } from 'context/InstrumentAndEquipmentContext';
import { ScheduledEventBookingType, ScheduledEventFilter } from 'generated/sdk';
import { useQuery } from 'hooks/common/useQuery';
import { toTzLessDateTime, TZ_LESS_DATE_TIME_FORMAT } from 'utils/date';
import { getFullUserName } from 'utils/user';

import {
  CalendarScheduledEventWithUniqeId,
  getArrayOfIdsFromQuery,
  SchedulerViewPeriod,
} from './CalendarViewContainer';
import { getBookingTypeStyle } from './Event';
import 'moment/locale/en-gb';
import Toolbar, { getLabelText } from './Toolbar';

function Droppable({
  children,
  itemIdAccepts,
  style,
  slot,
  onDrop,
  ...rest
}: any) {
  const [collected, droppableRef] = useDrop({
    drop: (item, monitor) => {
      onDrop(item, slot);
    },
    accept: itemIdAccepts,
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });
  const isVisable = collected.canDrop;

  return (
    <div
      style={{
        ...style,
        display: isVisable ? 'initial' : 'none',
      }}
      ref={droppableRef}
      {...rest}
    >
      {children}
    </div>
  );
}

function Draggable({ id, children, onDragStart, onDragEnd, ...rest }: any) {
  const [collectedProps, dragRef] = useDrag({
    item: { id },
    type: id,
    end: (item, monitor) => {
      console.log(monitor);
      onDragEnd(item);
    },
  });

  return (
    <div {...rest} ref={dragRef}>
      {children}
    </div>
  );
}

function DroppablesLayer({
  getLayerRootProps,
  itemsToDrag,
  getLeftOffsetFromDate,
  handleDrop,
  group,
}: any) {
  console.log(itemsToDrag, handleDrop, group, getLayerRootProps);

  return (
    <div {...getLayerRootProps()}>
      {itemsToDrag.map((item: any, index: number) => {
        return item.slots
          .filter((slot: any) => slot.groupId === group.id)
          .map((slot: any) => {
            console.log('aaaa', slot.startTime, slot.endTime);
            const left = getLeftOffsetFromDate(slot.startTime.valueOf());
            const right = getLeftOffsetFromDate(slot.endTime.valueOf());

            console.log('direction', left, right);

            return (
              <Droppable
                key={index}
                style={{
                  position: 'absolute',
                  left: left,
                  width: right - left,
                  backgroundColor: 'purple',
                  height: '100%',
                }}
                itemIdAccepts={item.id}
                slot={slot}
                onDrop={handleDrop}
              >
                {item.title}
              </Droppable>
            );
          });
      })}
    </div>
  );
}

type TimeLineViewProps = {
  events: CalendarScheduledEventWithUniqeId[];
  filter: ScheduledEventFilter;
  onSelectEvent: (selectedEvent: CalendarScheduledEventWithUniqeId) => void;
  onDropFromOutside: (data: {
    start: stringOrDate;
    end: stringOrDate;
  }) => Promise<void>;
};

type TimeLineGroupType = {
  id: string | number;
  title: string;
  parent: string | null;
  root: boolean;
};

enum RootGroups {
  INSTRUMENT = 'instrument',
  EQUIPMENT = 'equipment',
  LOCAL_CONTACT = 'local_contact',
}

// NOTE: Debounce the function because there are too many calls on scroll so we want to avoid bombarding the backend with so many requests for new events
const handleTimeChange = debounce(
  (newStart: moment.Moment, query: URLSearchParams, history: H.History) => {
    query.set('startsAt', newStart.format(TZ_LESS_DATE_TIME_FORMAT));
    history.push(`?${query}`);
  },
  500
);

const getRootGroupTitle = (rootGroupName: RootGroups) =>
  `${rootGroupName.replace('_', ' ')}s`;

const getRootGroupItems = (
  rootGroupName: RootGroups,
  items: { id: number; name: string }[]
): TimeLineGroupType[] => [
  {
    id: `${rootGroupName}_root`,
    title: getRootGroupTitle(rootGroupName),
    parent: null,
    root: true,
  },
  ...items.map((item) => ({
    id: `${rootGroupName}_${item.id}`,
    title: item.name,
    parent: `${rootGroupName}_root`,
    root: false,
  })),
];

const getEventItemGroup = (
  eventItem: CalendarScheduledEventWithUniqeId,
  isLocalContactEvent = false
) => {
  switch (eventItem.bookingType) {
    case ScheduledEventBookingType.EQUIPMENT:
      return `equipment_${eventItem.equipmentId}`;
    default:
      return isLocalContactEvent
        ? `local_contact_${eventItem.localContact?.id}`
        : `instrument_${eventItem.instrument?.id || 0}`;
  }
};

const getEventTitle = (event: CalendarScheduledEventWithUniqeId) =>
  `${event.proposalBooking?.proposal?.title || event.title} (${
    event.proposalBooking?.proposal?.proposalId || event.description
  }) - [${toTzLessDateTime(event.start)} - ${toTzLessDateTime(event.end)}] - ${
    event.status
  }`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .react-calendar-timeline': {
      '& .rct-header-root': {
        background: theme.palette.primary.main,

        '& .primaryHeader .customPrimaryHeader ~ .customPrimaryHeader': {
          display: 'none',
        },

        '& .customPrimaryHeader': {
          left: '0 !important',
          width: '100% !important',
          textAlign: 'center',
          padding: theme.spacing(0.5),
          color: '#fff',
        },
      },
      '& .rct-items .rct-item .rct-item-content': {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '100%',
      },

      '& .rct-sidebar .rct-sidebar-row': {
        padding: 0,

        '& .title': {
          paddingLeft: theme.spacing(1),
        },

        '& .custom-group': {
          background: 'lightgray',
          padding: theme.spacing(0, 0.5),
          textTransform: 'capitalize',
        },
      },

      // NOTE: Better visual separation of different groups
      '& .rct-scroll .rct-hl': {
        borderBottom: 'none !important',

        '&.row-root': {
          borderTop: '2px solid blue !important',
          background: 'lightgray',
          zIndex: 100,
        },
      },

      '& .rct-scroll .row-root .rct-vertical-lines': {
        display: 'none',
      },
    },
  },
}));

// TODO: Cleanup and refactor grouping logic
const TimeLineView: React.FC<TimeLineViewProps> = ({
  events,
  filter,
  onSelectEvent,
  onDropFromOutside,
}) => {
  const query = useQuery();
  const history = useHistory();
  const classes = useStyles();
  // const helpers = useContext(HelpersContext);
  const { instruments, equipments, localContacts } = useContext(
    InstrumentAndEquipmentContext
  );

  const queryView =
    (query.get('viewPeriod') as SchedulerViewPeriod) || Views.WEEK;
  const queryStartsAt = query.get('startsAt');
  const queryInstrument = query.get('instrument');
  const queryEquipment = query.get('equipment');
  const queryLocalContact = query.get('localContact');

  const [instrumentGroups, setInstrumentGroups] = useState<TimeLineGroupType[]>(
    []
  );
  const [equipmentGroups, setEquipmentGroups] = useState<TimeLineGroupType[]>(
    []
  );
  const [localContactGroups, setLocalContactGroups] = useState<
    TimeLineGroupType[]
  >([]);

  const initialVisibleTimeStart = moment
    .utc(queryStartsAt || moment().startOf(queryView))
    .local();
  const initialVisibleTimeEnd = moment(initialVisibleTimeStart).add(
    1,
    queryView
  );

  const [visibleTimeStart, setVisibleTimeStart] = useState(
    initialVisibleTimeStart
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(initialVisibleTimeEnd);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    instrument_root: true,
    equipment_root: true,
    local_contact_root: true,
  });

  useEffect(() => {
    if (queryStartsAt) {
      const newVisibleTimeStart = moment.utc(queryStartsAt).local();
      const newVisibleTimeEnd = moment(newVisibleTimeStart).add(1, queryView);

      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }
  }, [queryStartsAt, queryView]);

  useEffect(() => {
    const queryInstrumentIds = getArrayOfIdsFromQuery(queryInstrument);

    if (queryInstrumentIds?.length !== 0 && instruments.length) {
      const selectedInstruments = instruments.filter((item) =>
        queryInstrumentIds.includes(item.id)
      );

      const newInstrumentGroupItems = getRootGroupItems(
        RootGroups.INSTRUMENT,
        selectedInstruments
      );

      setInstrumentGroups(newInstrumentGroupItems);
    } else {
      setInstrumentGroups([]);
    }
  }, [instruments, queryInstrument]);

  useEffect(() => {
    const queryEquipmentIds = getArrayOfIdsFromQuery(queryEquipment);

    if (queryEquipmentIds?.length !== 0 && equipments.length) {
      const selectedEquipment = equipments.filter((item) =>
        queryEquipmentIds.includes(item.id)
      );

      const newEquipmentGroupItems = getRootGroupItems(
        RootGroups.EQUIPMENT,
        selectedEquipment
      );

      setEquipmentGroups(newEquipmentGroupItems);
    } else {
      setEquipmentGroups([]);
    }
  }, [equipments, queryEquipment]);

  useEffect(() => {
    const queryLocalContactIds = getArrayOfIdsFromQuery(queryLocalContact);

    if (queryLocalContactIds?.length !== 0 && localContacts.length) {
      const selectedLocalContacts = localContacts
        .filter((item) => queryLocalContactIds.includes(item.id))
        .map((item) => ({ id: item.id, name: getFullUserName(item) }));

      const newLocalContactGroupItems = getRootGroupItems(
        RootGroups.LOCAL_CONTACT,
        selectedLocalContacts
      );

      setLocalContactGroups(newLocalContactGroupItems);
    } else {
      setLocalContactGroups([]);
    }
  }, [localContacts, queryLocalContact]);

  const onTimeChange = (
    newVisibleTimeStart: number,
    newVisibleTimeEnd: number
  ) => {
    const newStart = moment(newVisibleTimeStart);
    const newEnd = moment(newVisibleTimeEnd);

    // NOTE: Like this we prevent calling handleTimeChange on initial render because it's not needed to do one more re-render
    if (!newStart.diff(visibleTimeStart, 'hours')) {
      return;
    }

    setVisibleTimeStart(newStart);
    setVisibleTimeEnd(newEnd);

    handleTimeChange(newStart, query, history);
  };

  const onToggleGroup = (id: string | number) => {
    setOpenGroups({ ...openGroups, [id]: !openGroups[id] });
  };

  const getLocalContactTimelineEvents = () =>
    events
      .filter(
        (event) =>
          event.bookingType === ScheduledEventBookingType.USER_OPERATIONS &&
          event.localContact
      )
      .map((event) => ({
        id: `${event.id}_${event.bookingType}_${event.equipmentId}`,
        group: getEventItemGroup(event, true),
        title: getEventTitle(event),
        itemProps: {
          onClick: () => onSelectEvent(event),
          onTouchStart: () => onSelectEvent(event),
          style: {
            ...getBookingTypeStyle(event),
            overflow: 'hidden',
          },
        },
        start_time: moment(event.start),
        end_time: moment(event.end),
      }));

  const getInstrumentAndEquipmentTimelineEvents = () =>
    events.map((event) => ({
      id: `${event.id}_${event.bookingType}_${event.equipmentId}`,
      group: getEventItemGroup(event),
      title: getEventTitle(event),
      itemProps: {
        onClick: () => onSelectEvent(event),
        onTouchStart: () => onSelectEvent(event),
        style: {
          ...getBookingTypeStyle(event),
          overflow: 'hidden',
        },
      },
      start_time: moment(event.start),
      end_time: moment(event.end),
    }));

  const timeLineGroups = [
    ...instrumentGroups,
    ...equipmentGroups,
    ...localContactGroups,
  ];

  const timeLineGroupsWithCustomTitle = timeLineGroups.length
    ? timeLineGroups
        .filter((g) => g.root || (g.parent && openGroups[g.parent]))
        .map((group) => {
          return {
            ...group,
            title: group.root ? (
              <div
                onClick={() => onToggleGroup(group.id)}
                style={{ cursor: 'pointer' }}
              >
                {openGroups[group.id] ? '[-]' : '[+]'} <b>{group.title}</b>
              </div>
            ) : (
              <Box
                title={group.title}
                component="div"
                className="rct-sidebar-row"
                data-cy="item-group"
              >
                <span className="title">{group.title}</span>
              </Box>
            ),
          };
        })
    : [];

  const timelineEvents = [
    ...getInstrumentAndEquipmentTimelineEvents(),
    ...getLocalContactTimelineEvents(),
  ];

  const itemsToDrag = [
    {
      title: 'fold',
      id: 'instrument_1',
      slots: [
        {
          groupId: 'instrument_1',
          startTime: moment().startOf('day'),
          endTime: moment().startOf('day').add(24, 'h'),
        },
        {
          groupId: 'instrument_1',
          startTime: moment().startOf('day').add(24, 'h'),
          endTime: moment().startOf('day').add(48, 'h'),
        },
      ],
    },
  ];

  const handleDrop = (item: any, slot: any) => {
    onDropFromOutside({
      start: slot.startTime.toDate(),
      end: slot.endTime.toDate(),
    });
  };

  return (
    <div data-cy="calendar-timeline-view" className={classes.root}>
      <Toolbar
        filter={filter}
        shouldIncludeCalendarNavigation
        multipleInstruments
      />
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          {itemsToDrag.map((dragItem) => {
            return (
              <Draggable
                key={dragItem.id}
                id={dragItem.id}
                style={{
                  height: '100%',
                  width: 100,
                  background: 'white',
                  marginLeft: 15,
                  border: '1px solid black',
                  padding: 5,
                }}
                onDragEnd={(item: any) => console.log('dragEnd', item)}
                onDragStart={(item: any) => console.log('dragStart', item)}
              >
                {dragItem.title}
              </Draggable>
            );
          })}
        </div>
        <Timeline
          groups={timeLineGroupsWithCustomTitle}
          groupRenderer={({ group }) => (
            <div className={`${group.root ? 'custom-group' : ''}`}>
              {group.title}
            </div>
          )}
          items={timelineEvents}
          visibleTimeStart={visibleTimeStart.valueOf()}
          visibleTimeEnd={visibleTimeEnd.valueOf()}
          resizeDetector={containerResizeDetector}
          horizontalLineClassNamesForGroup={(group) =>
            group.root ? ['row-root'] : []
          }
          stackItems
          canMove={false}
          canResize={false}
          onTimeChange={onTimeChange}
          // @ts-expect-error test test
          rowRenderer={({ getLayerRootProps, group }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const helpers = React.useContext(HelpersContext);

            return (
              <GroupRow>
                <RowItems />
                <DroppablesLayer
                  getLayerRootProps={getLayerRootProps}
                  itemsToDrag={itemsToDrag}
                  getLeftOffsetFromDate={(helpers as any).getLeftOffsetFromDate}
                  handleDrop={handleDrop}
                  group={group}
                />
              </GroupRow>
            );
          }}
        >
          {queryView === 'week' && (
            <TimelineHeaders>
              <SidebarHeader>
                {({ getRootProps }) => {
                  return <div {...getRootProps()} />;
                }}
              </SidebarHeader>
              <DateHeader
                unit="primaryHeader"
                className="primaryHeader"
                intervalRenderer={(props) => {
                  if (!props) {
                    return;
                  }
                  const { getIntervalProps } = props;

                  return (
                    <div
                      className="customPrimaryHeader"
                      {...getIntervalProps()}
                    >
                      {getLabelText(queryView, visibleTimeStart.toString())}
                    </div>
                  );
                }}
              />
              <DateHeader />
            </TimelineHeaders>
          )}
        </Timeline>
      </DndProvider>
    </div>
  );
};

export default TimeLineView;
