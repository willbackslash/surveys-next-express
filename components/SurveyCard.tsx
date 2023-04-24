import React, { useState } from 'react';
import { Button, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import { deleteSurvey } from '../services/SurveyService';

interface CardProps {
  data: SurveyData;
  isAdmin: Boolean;
  isBasicUser: Boolean;
}

const SurveyCard: React.FC<CardProps> = ({ data, isAdmin, isBasicUser }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteSurvey = (id: number | undefined) => {
    if (id) {
      deleteSurvey(id).then((response) => {
        if (response) window.location.reload();
      });
    }
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
        <ListGroup>
          {data.options.map((option) => (
            <ListGroupItem key={option.index}>{option.name}</ListGroupItem>
          ))}
        </ListGroup>
        {isBasicUser && (
          <Button className="mr-2 my-3" variant="primary" href={`/surveys/vote/${data.id}`}>
            Vote
          </Button>
        )}
        {isAdmin && (
          <>
            <Button className="my-3" onClick={() => setShowDeleteModal(true)} variant="danger">
              Delete
            </Button>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this survey?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => handleDeleteSurvey(data.id)}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default SurveyCard;
