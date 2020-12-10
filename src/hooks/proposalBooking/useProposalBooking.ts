import { useState, useEffect } from 'react';

import { Call, Proposal, ProposalBooking } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export type DetailedProposalBooking = Pick<
  ProposalBooking,
  'id' | 'createdAt' | 'updatedAt' | 'status' | 'allocatedTime'
> & {
  call: Pick<
    Call,
    'id' | 'shortCode' | 'startCycle' | 'endCycle' | 'cycleComment'
  >;
} & {
  proposal: Pick<Proposal, 'id' | 'title' | 'shortCode'>;
};

export default function useProposalBooking(id: string) {
  const [loading, setLoading] = useState(true);
  const [
    proposalBooking,
    setProposalBooking,
  ] = useState<DetailedProposalBooking | null>(null);

  const api = useDataApi();

  useEffect(() => {
    let unmount = false;

    setLoading(true);
    api()
      .getProposalBooking({ id })
      .then(data => {
        if (unmount) {
          return;
        }

        if (data.proposalBooking) {
          setProposalBooking(data.proposalBooking);
        }

        setLoading(false);
      })
      .catch(console.error);

    return () => {
      unmount = true;
    };
  }, [id, api]);

  return { loading, proposalBooking } as const;
}
