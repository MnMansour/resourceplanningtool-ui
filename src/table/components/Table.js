// @flow

import React from 'react';
import PropTypes from 'prop-types';
import css from './Table.css';

const Table = props => (
  <table className={css.container__table}>
    <thead>
      <tr>
        <th className={css.row__name}>
          {props.columnHeaders[0]}
          <span id="sort" />{' '}
        </th>
        <th className={css.row__website}>{props.columnHeaders[1]}</th>
        <th className={css.row__industry}>{props.columnHeaders[2]}</th>
      </tr>
    </thead>
    <tbody>
      {props.rowsValue.map((row, index) => (
        <Row
          key={index}
          values={row}
          displayedFields={props.displayedFields}
          navigate={props.navigate}
        />
      ))}
    </tbody>
  </table>
);

export const Row = props => (
  <tr
    onClick={() => {
      props.navigate(props.values.id);
    }}
  >
    <td className={css.row__name}>
      {' '}
      {props.values[props.displayedFields[0]]}{' '}
    </td>
    <td className={css.row__website}>
      {props.values[props.displayedFields[1]]}
    </td>
    <td className={css.row__industry}>
      {props.values[props.displayedFields[2]]}
    </td>
  </tr>
);

Table.propTypes = {
  columnHeaders: PropTypes.arrayOf(PropTypes.string).isRequired, // should have 3 values
  rowsValue: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayedFields: PropTypes.arrayOf(PropTypes.string).isRequired, // should have 3 values
};

Row.propTypes = {
  values: PropTypes.object.isRequired,
  displayedFields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Table;
