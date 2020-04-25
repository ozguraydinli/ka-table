import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { closeRowEditor, openRowEditor, updateRow } from '../../lib/actionCreators';
import { DataType, EditingMode } from '../../lib/enums';
import {
  CellFuncPropsWithChildren, DispatchFunc, EditorFuncPropsWithChildren,
} from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 10, 8, 10) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2021, 11, 8, 10) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 9, 10) },
];

const EditButton: React.FC<CellFuncPropsWithChildren> = ({
  dispatch, rowKeyValue
}) => {
  return (
   <img
     src='static/icons/alert.svg'
     className='alert-cell-button'
     alt=''
     onClick={() => dispatch(openRowEditor(rowKeyValue))}
   />
 );
};

const SaveButton: React.FC<EditorFuncPropsWithChildren> = ({
  dispatch, rowData, rowKeyValue
}) => {
  return (
    <div className={'buttons'}
      style={{display: 'flex', justifyContent: 'space-between'}} >
      <img
        src='static/icons/alert.svg'
        className='alert-cell-button'
        alt=''
        onClick={() => {
          dispatch(updateRow(rowData, { saveEditorsValues: true }));
          dispatch(closeRowEditor(rowKeyValue));
          }}
      />
      <img
        src='static/icons/alert.svg'
        className='alert-cell-button'
        alt=''
        onClick={() => {
          dispatch(closeRowEditor(rowKeyValue));
          }}
      />
   </div >
 );
};

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String, style: { width: '30%' } },
    { key: 'score', title: 'Score', dataType: DataType.Number, style: { width: '40px' } },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean, style: { width: '10%' }},
    {
      dataType: DataType.Date,
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      title: 'Next Try',
    },
    {
      key: 'editColumn',
      style: {width: 50},
      cell: (props) => <EditButton {...props}/>,
      editor: (props) => <SaveButton {...props}/>,
    },
  ],
  data: dataArray,
  editableCells: [{
    columnKey: 'name',
    rowKeyValue: 2,
  }, {
    columnKey: 'score',
    rowKeyValue: 2,
  }],
  rowKeyField: 'id',
};

const EditingDemoRow: React.FC = () => {
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

export default EditingDemoRow;