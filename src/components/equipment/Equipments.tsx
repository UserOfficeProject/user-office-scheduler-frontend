import MaterialTable, { Column } from '@material-table/core';
import { Button, Grid } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import { tableIcons } from 'components/common/TableIcons';
import { PATH_CREATE_EQUIPMENT } from 'components/paths';
import useEquipments, { PartialEquipment } from 'hooks/equipment/useEquipments';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';

const columns: Column<PartialEquipment>[] = [
  { field: 'name', title: 'Name' },
  { field: 'description', title: 'Description' },
];

export default function Equipments() {
  const { equipments, loading } = useEquipments();
  const [editEquipmentId, setEditEquipmentId] = useState(0);

  if (editEquipmentId) {
    return <Redirect push to={`/equipments/${editEquipmentId}`} />;
  }

  return (
    <ContentContainer maxWidth={false}>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper margin={[0, 1]} data-cy="role-selection-table">
            <MaterialTable
              icons={tableIcons}
              title="Equipments"
              columns={columns}
              data={equipments}
              isLoading={loading}
              actions={[
                {
                  icon: VisibilityIcon,
                  tooltip: 'View equipment',
                  onClick: (_event, rowData) =>
                    setEditEquipmentId((rowData as PartialEquipment).id),
                  position: 'row',
                },
              ]}
            />
            <ActionButtonContainer>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                component={Link}
                to={PATH_CREATE_EQUIPMENT}
                data-cy="btn-new-equipment"
              >
                New equipment
              </Button>
            </ActionButtonContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
