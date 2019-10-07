import React from 'react';

import { EditingMode } from '../../Enums/EditingMode';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { isEditableCell } from '../../Utils/CellUtils';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import CellComponent from '../CellComponent/CellComponent';

export interface IRowProps {
  columns: Column[];
  onOptionChanged: OptionChangedFunc;
  rowKeyValue: any;
  rowData: any;
  editableCells: Cell[];
  editingMode: EditingMode;
}

const Row: React.FunctionComponent<IRowProps> = ({
  columns,
  rowData,
  rowKeyValue,
  editableCells,
  onOptionChanged,
  editingMode,
}) => {
  const rowEditableCells = getRowEditableCells(rowKeyValue, editableCells);
  return (
    <tr>
      {columns.map((column) => (
        <CellComponent
          key={column.field}
          rowData={rowData}
          field={column.field}
          rowKeyValue={rowKeyValue}
          isEditableCell={isEditableCell(editingMode, column.field, rowEditableCells)}
          editableCells={editableCells}
          onOptionChanged={onOptionChanged}
        />
      ))}
    </tr>
  );
};

export default Row;
