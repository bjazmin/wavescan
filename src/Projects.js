import React from 'react';
import Project from './Project';
import { Container, Row } from 'react-bootstrap';
import './project.css';

function Projects({ projects }) {
  return (
    <div className="project-disp">
      <Container>
        <Row className="justify-content-center g-4">
          {projects.map((project, index) => {
            return <Project key={index} {...project}></Project>;
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Projects;
