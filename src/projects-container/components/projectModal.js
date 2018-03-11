import React from 'react';
import {observer} from 'mobx-react';
import Modal from 'react-modal';
import ProjectStore from '../../projects-container/projects-store';
import PeopleStore from '../../people-container/people-store';
import {Input, InputCheckbox, Textarea, SELECT} from './inputs';
import css from './projectModal.css';
import closeIcon from '../../assets/icon_close.svg';
import sortIcon from '../../assets/icon_arrow_up.svg';
import deleteIcon from '../../assets/icon_delete.svg';
import addIcon from '../../assets/icon_add_b.svg';

const ProjectModal = observer(({form, isOpen, closeModal, modalName}) => {
  return (
    <Modal isOpen={isOpen} className={css.Modal} ariaHideApp={false}>
      <div>
        <img
          className={css.modal__close}
          src={closeIcon}
          alt="close"
          onClick={closeModal}
        />
        <div className={css.modal__title}>{modalName}</div>
        <form>
          <div className={css.section}>
            <div className={css.cell}>
              <SELECT field={form.$('customer')} />
              <Input field={form.$('contactemail')} />
              <InputCheckbox field={form.$('ongoing')} />
            </div>
            <div className={css.verticalLine} />
            <div className={css.cell}>
              <Input field={form.$('name')} />
              <Input field={form.$('starttime')} />
              <Input field={form.$('endtime')} />
            </div>
          </div>
          <div className={css.form__dvider}>Project description</div>
          <div className={css.section}>
            <div className={css.cell1}>
              <Textarea field={form.$('shortdescription')} />
            </div>
            <div className={css.verticalLine} />
            <div className={css.cell2}>
              <Textarea field={form.$('description')} />
            </div>
          </div>
          <div className={css.form__dvider}>People in project</div>
          <div className={css.cell}>
            <SELECT
              field={form.$('member')}
              addTo={ProjectStore.addToMembers}
              option={PeopleStore.people}
            />
          </div>
          <div className={css.table__header}>
            <div className={css.table__title}>
              PERSON
              <img className={css.form__icon} src={sortIcon} alt="sort" />
            </div>
            <img
              className={css.form__icon}
              src={deleteIcon}
              alt="delete"
              onClick={ProjectStore.removeAllMembers}
            />
          </div>
          {form.$('members').value.map((item, i) => {
            const personName = PeopleStore.people.filter(({id, name}) => {
              return id === item.name;
            });
            return (
              <div key={i} className={css.table__item}>
                <span>{personName[0].name}</span>
                <img
                  className={css.form__icon}
                  src={deleteIcon}
                  alt="delete"
                  onClick={() => ProjectStore.removeMember(item.name)}
                />
              </div>
            );
          })}
          <div className={css.form__dvider}>Core technologies</div>
          <div className={css.cell}>
            <SELECT
              field={form.$('usedTechnologies')}
              addTo={ProjectStore.addToTechnologies}
              option={ProjectStore.technologiesList}
            />
          </div>
          <div className={css.selected__tech__container}>
            {form.$('technologies').value.map((tech, i) => {
              const techName = ProjectStore.technologiesList.filter(
                ({id, name}) => {
                  return id === tech.name;
                }
              );
              return (
                <div key={i} className={css.selected__tech}>
                  {techName[0].name}
                  <img
                    className={css.remove__tech}
                    onClick={() => ProjectStore.removeTechnologie(tech.name)}
                    src={closeIcon}
                    alt="close"
                  />
                </div>
              );
            })}
          </div>
          <div className={css.form__dvider}>Links</div>
          <div className={css.section}>
            <div className={css.cell}>
              <Input field={form.$('liveat')} />
            </div>
            <div className={css.verticalLine} />
            <div className={css.cell}>
              <Input field={form.$('githuburl')} />
            </div>
          </div>
          <div className={css.table__header}>
            <div className={css.table__title}>
              IN THE NEWS
              <img className={css.form__icon} src={sortIcon} alt="sort" />
            </div>
            <img className={css.form__icon} src={deleteIcon} alt="delete" />
          </div>
          <div className={css.table__item}>
            <div className={css.news__url}>
              <Input field={form.$('otherLinks')} />
              <Input field={form.$('newsDescription')} />
              <div className={css.news__url__button}>
                <img src={addIcon} alt="add" /> <span>ADD</span>
              </div>
            </div>
          </div>
          <div className={css.form__button}>
            <div onClick={form.onSubmit} className={css.form__button__sava}>
              SAVE
            </div>
            <span onClick={closeModal} className={css.form__button__close}>
              Cancel
            </span>
          </div>
        </form>
      </div>
    </Modal>
  );
});

export default ProjectModal;
