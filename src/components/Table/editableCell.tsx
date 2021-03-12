import React from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
  padding: 5,
  margin: 0,
  border: "1px solid black",
  backgroundColor: 'white',
}

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column,
  updateData, // This is a custom function that we supplied to our table instance
}: any) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = (e: any) => {
    let value = e.target.value;
    // maybe also do this for other string types like date?
    if (column.Type === "number") {
      value = Number(value);
    }
    setValue(value);
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    const arrayIndex = index;
    const key = column.id;
    if (value !== initialValue) {
      updateData(arrayIndex, key, value);
    }
  }

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <input
      style={inputStyle}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

EditableCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }),
  row: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }),
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  updateData: PropTypes.func.isRequired,
}

export const createEditableCell = () => ({
  Cell: EditableCell,
});