import { useState, useEffect, useCallback } from 'react';

import { ScheduledEvent, User } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export type ProposalBookingScheduledEvent = Pick<
  ScheduledEvent,
  'id' | 'startsAt' | 'endsAt' | 'bookingType' | 'status' | 'description'
> & { scheduledBy?: Pick<User, 'id' | 'firstname' | 'lastname'> | null };

export default function useProposalBookingScheduledEvents(
  proposalBookingId: number
) {
  const [loading, setLoading] = useState(true);
  const [scheduledEvents, setScheduledEvents] = useState<
    ProposalBookingScheduledEvent[]
  >([]);

  const api = useDataApi();

  const [counter, setCounter] = useState<number>(0);

  const refresh = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, [setCounter]);

  useEffect(() => {
    let unmount = false;

    setLoading(true);
    api()
      .getProposalBookingScheduledEvents({ proposalBookingId })
      .then((data) => {
        if (unmount) {
          return;
        }

        if (data.proposalBookingScheduledEvents) {
          setScheduledEvents(data.proposalBookingScheduledEvents);
        }

        setLoading(false);
      })
      .catch(console.error);

    return () => {
      unmount = true;
    };
  }, [proposalBookingId, api, counter]);

  return { loading, scheduledEvents, refresh } as const;
}
