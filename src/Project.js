import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';

const Project = (props) => {
  const project = props;

  return (
    <>
      <Col className="d-flex justify-content-center">
        <Card className="m-2 border-0 shadow-sm text-left card-size">
          <Card.Img
            variant="top"
            src={project.img}
            style={{ height: '200px' }}
          />
          <Card.Body>
            <Card.Title className="font-card-heading">
              {project.title}
            </Card.Title>
            <div className="tag-section">
              {project.tags.map((tag) => {
                return <span className="badge sm font-card-tag">{tag}</span>;
              })}
            </div>
            <Card.Text className="font-card-desc">
              {project.description}
            </Card.Text>
            <div className="position-absolute bottom-0 start-50 translate-middle-x">
              <Button className="btn-custom m-3">View More</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default Project;
