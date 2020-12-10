import { useState, useEffect } from 'react';

import { Equipment, User } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export type DetailedEquipment = Pick<
  Equipment,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'name'
  | 'maintenanceStartsAt'
  | 'maintenanceEndsAt'
  | 'autoAccept'
> & { owner: Pick<User, 'firstname' | 'lastname'> };

export default function useEquipment(id: string) {
  const [loading, setLoading] = useState(true);
  const [equipment, setEquipment] = useState<DetailedEquipment | null>(null);

  const api = useDataApi();

  useEffect(() => {
    let unmount = false;

    setLoading(true);
    api()
      .getEquipment({ id })
      .then(data => {
        if (unmount) {
          return;
        }

        if (data.equipment) {
          setEquipment(data.equipment);
        }

        setLoading(false);
      })
      .catch(console.error);

    return () => {
      unmount = true;
    };
  }, [id, api]);

  return { loading, equipment } as const;
}
