import { Grid, TableCell, IconButton, Button } from '@material-ui/core';
import { Visibility as VisibilityIcon } from '@material-ui/icons';
import React from 'react';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';

import Table, { HeadCell } from 'components/common/Table';
import { PATH_VIEW_EQUIPMENT, PATH_CREATE_EQUIPMENT } from 'components/paths';
import useEquipments from 'hooks/equipment/useEquipments';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';

export type EquipmentTableRow = {
  id: string;
  name: string;
};

const defaultHeadCells: HeadCell<EquipmentTableRow>[] = [
  { id: 'id', label: 'Actions' },
  { id: 'name', label: 'Name' },
];

export default function Equipments() {
  const { equipments } = useEquipments();

  return (
    <ContentContainer maxWidth={false}>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper margin={[0, 1]}>
            <Table
              tableTitle="Equipments"
              headCells={defaultHeadCells}
              rows={equipments}
              extractKey={el => el.id}
              renderRow={row => {
                return (
                  <>
                    <TableCell component="th" scope="row" padding="none">
                      <Link
                        to={generatePath(PATH_VIEW_EQUIPMENT, { id: row.id })}
                        style={{ paddingLeft: '8px' }}
                      >
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                  </>
                );
              }}
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={PATH_CREATE_EQUIPMENT}
              >
                Create
              </Button>
            </div>
          </StyledPaper>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
