import React, { useCallback, useEffect, useState } from 'react';

import { Events } from '../../enums';
import { Cell } from '../../models';
import { addEscEnterKeyEffect } from '../../Utils/EffectUtils';
import { getValidationValue } from '../../Utils/Validation';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';
import CellEditorValidationMessage from '../CellEditorValidationMessage/CellEditorValidationMessage';

const CellEditorState: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    column,
    column: {
      field,
    },
    rowData,
    rowKey,
    onEvent,
    onValueChange,
  } = props;
  const [value, changeValue] = useState(rowData);

  const validationValue = getValidationValue(value, column.field, column.validation);
  const onValueStateChange = (newValue: any): void => {
    const rowValue = { ...rowData, ...{ [field]: newValue } };
    changeValue(rowValue);
  };

  const close = useCallback(() => {
    const cell: Cell = { field: column.field, rowKeyValue: rowData[rowKey] };
    onEvent(Events.CloseEditor, { cell });
  }, [onEvent, column, rowData, rowKey]);

  const closeHandler = useCallback(() => {
    if (!validationValue) {
      if (rowData[field] !== value[field]) {
        onValueChange({ ...rowData, ...{ [field]: value[field] } });
      }
      close();
    }
  }, [validationValue, onValueChange, close, value, field, rowData]);

  useEffect(() => {
    return addEscEnterKeyEffect(close, closeHandler);
  }, [close, closeHandler]);

  const onEventHandler = (event: string, eventData: any) => {
    if (event === Events.CloseEditor) {
      closeHandler();
    } else {
      onEvent(event, eventData);
    }
  };

  const stateProps = { ...props, ...{
    onEvent: onEventHandler,
    onValueChange: onValueStateChange,
    rowData : value,
  }};

  return (
    <>
      <CellEditorDataType {...stateProps} />
      {validationValue && <CellEditorValidationMessage message={validationValue} />}
    </>
  );
};

export default CellEditorState;
