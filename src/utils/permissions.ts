import { AuthenticatedUser } from 'context/UserContext';
import { UserRole } from 'generated/sdk';
import { DetailedEquipment } from 'hooks/equipment/useEquipment';

export const isEquipmentResponsiblePerson = (
  equipment: DetailedEquipment | null,
  loggedInUser?: AuthenticatedUser | null,
  loggedInUserCurrentRole?: UserRole | null
) =>
  loggedInUserCurrentRole === UserRole.INSTRUMENT_SCIENTIST &&
  !!equipment?.equipmentResponsible.find(
    (user) => user.id === loggedInUser?.id
  );

export const isEquipmentOwner = (
  equipment: DetailedEquipment | null,
  loggedInUser?: AuthenticatedUser | null
) => equipment?.owner?.id === loggedInUser?.id;
