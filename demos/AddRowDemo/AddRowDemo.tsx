import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { addRow, updateNewRow } from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import {
  DispatchFunc, EditorFuncPropsWithChildren, HeaderCellFuncPropsWithChildren,
} from 'ka-table/types';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

let maxValue = Math.max(...dataArray.map(i => i.id));
const generateNewId = () => {
  maxValue++;
  return maxValue;
};

const AddButton: React.FC<HeaderCellFuncPropsWithChildren> = ({
  dispatch,
}) => {
 return (
   <img
     src='static/icons/alert.svg'
     className='alert-cell-button'
     alt=''
     onClick={() => dispatch(updateNewRow({}))}
   />
 );
};

const SaveButton: React.FC<EditorFuncPropsWithChildren> = ({
  dispatch, rowData
}) => {
  const saveNewData = () => {
    const newData = {...rowData, id: generateNewId() };
    dispatch(addRow(newData));
    dispatch(updateNewRow(undefined));
  };
  return (
   <img
     src='static/icons/alert.svg'
     className='alert-cell-button'
     alt=''
     onClick={saveNewData}
   />
 );
};

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: 'addColumn', headCell: AddButton, style: {width: 30}, editor: (props) => <SaveButton {...props}/> },
  ],
  data: dataArray,
  rowKeyField: 'id',
};

const AddRowDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
    />
  );
};

export default AddRowDemo;