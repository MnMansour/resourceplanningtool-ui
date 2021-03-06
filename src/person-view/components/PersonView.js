// @flow

import React, {Component} from 'react';
import {isEmpty} from 'lodash';

import css from './PersonView.css';
import deleteIcon from '../../assets/icon_delete.svg';
import editIcon from '../../assets/icon_edit.svg';
import backIcon from '../../assets/icon_arrow_back.svg';
import defaultPicture from '../../assets/default-picture.png';
import PersonForm from '../../people-container/components/PersonForm';
import peopleStore from '../../people-container/people-store';
import {observer} from 'mobx-react';
import {parseDateTime} from '../../utils';
import {fields, plugins, hooks} from '../../constants/person-form-config';
import {getForm} from '../../utils';
import utilityStore from '../../utils/utility-store';
import LoadFailedRedirect from '../../redirect-component/components/Redirect';

@observer
class PersonView extends Component {
  onDelete = () => {
    peopleStore.deletePerson(this.props.match.params.id);
    this.props.history.push('/people');
  };

  componentWillMount() {
    if (!peopleStore.people[this.props.match.params.id]) {
      peopleStore.fetchPeople();
    }
  }

  render() {
    // find the person with specific id from the store
    const person = peopleStore.people.find(
      person => person.id === this.props.match.params.id
    );
    if (!person) {
      const personId = this.props.match.params.id;
      return (
        <LoadFailedRedirect
          message={`Timeout, no person with id "${personId}" was found`}
        />
      );
    }
    return (
      <div className={css.container}>
        <div className={css.container__backButton} onClick={this.props.history.goBack}>
          <img src={backIcon} alt="back" />{' '}
          <span className={css.button__text}>BACK</span>
        </div>
        <div className={css.container__buttonsGroup}>
          <button
            type="button"
            className={css.buttonsGroup__button}
            onClick={utilityStore.togglePersonForm}
          >
            <img alt="" src={editIcon} />
            <span className={css.button__text}>EDIT</span>
          </button>
          <button
            type="button"
            className={css.buttonsGroup__button}
            onClick={this.onDelete}
          >
            <img alt="" src={deleteIcon} />
            <span className={css.button__text}>DELETE</span>
          </button>
        </div>
        <PersonDetails personDetails={person} />
        <PersonForm
          form={getForm(fields, plugins, hooks, person)}
          mode={'edit'}
        />
      </div>
    );
  }
}

const PersonDetails = props => (
  <div className={css.container__personDetails}>
    <div className={css.personDetails__image}>
      <img
        className={css.image}
        src={
          isEmpty(props.personDetails.picture) ? (
            defaultPicture
          ) : (
            `http://${props.personDetails.picture}`
          )
        }
        alt={props.personDetails.name}
      />
    </div>
    <div className={css.personDetails__mainInfo}>
      <h4 className={css.mainInfo__name}>{props.personDetails.name}</h4>
      <p className={css.mainInfo__description}>
        {props.personDetails.description}
      </p>
      <div className={css.mainInfo__technologies}>
        {props.personDetails.skills.map((skill, index) => (
          // hardcoded technology
          <span key={index} className={css.mainInfo__technology}>
            {`${skill.name} (${skill.level})`}
          </span>
        ))}
      </div>
    </div>
    <div className={css.personDetails__minorInfo}>
      <div className={css.minorInfo__column}>
        <h5 className={css.minorInfo__title}>Title</h5>
        <span className={css.minorInfo__row}>
          <b>Started in Digia</b>
        </span>
        <span className={css.minorInfo__row}>
          <b>Location</b>
        </span>
        <span className={css.minorInfo__row}>
          <b>VIEW ON</b>
        </span>
      </div>
      <div className={css.minorInfo__column}>
        <h5 className={css.minorInfo__title}>{props.personDetails.title}</h5>
        <span className={css.minorInfo__row}>
          {parseDateTime(props.personDetails.startdate)}
        </span>
        <span className={css.minorInfo__row}>
          {props.personDetails.location}
        </span>
        <span className={css.minorInfo__rowLinks}>
          <a href={props.personDetails.linkedinurl}>LinkedIn</a>
          <div className={css.links__separateLine} />
          <a href={props.personDetails.githuburl}>Github</a>
        </span>
      </div>
    </div>
  </div>
);

export default PersonView;
