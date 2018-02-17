// @flow

import React, {Component} from 'react';
import Heading from './heading';
import Filters from './filters';
import css from './ProjectsContainer.css';

class ProjectsContainer extends Component {
  render() {
    return (
      <div className={css.projectsApp}>
        <div className={css.backgroundImg} />
        <div className={css.contanier}>
          <Heading projects="122" members="22" customers="12" />
          <Filters />
        </div>
      </div>
    );
  }
}

export default ProjectsContainer;
