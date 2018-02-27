// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import css from './CustomersContainer.css';
import CustomerForm from './CustomerForm';
import Table from '../../table/components/Table';
import {withNavigation} from '../../table/components/withNavigation';
import addIcon from '../../assets/icon_add_b.svg';
import customersStore from '../customers-store';

@observer
class CustomersContainer extends Component {
  @observable formIsOpened = false;

  toggleForm = (customer: ?Customer) => {
    this.formIsOpened = !this.formIsOpened;
  };
  toCustomer = (id: Number) => {
    this.props.history.push(`/customers/${id}`);
  };
  render() {
    return (
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.header__headline}>Customer</div>
          <button
            type="button"
            className={css.header__button}
            onClick={this.toggleForm}
          >
            <img src={addIcon} alt="" />
            <span>&nbsp; NEW CUSTOMER</span>
          </button>
          <CustomerForm
            isOpened={this.formIsOpened}
            toggleForm={this.toggleForm}
            customerInfo={{}}
            mode={'new'}
          />
        </div>
        <TableWithNavigation
          {...this.props}
          columnHeaders={['CUSTOMER', 'WEBSITE', 'INDUSTRY']}
          rowsValue={customersStore.customers}
          displayedFields={['name', 'url', 'industry']}
        />
      </div>
    );
  }
}

const TableWithNavigation = withNavigation(Table, '/customers');

export default CustomersContainer;
