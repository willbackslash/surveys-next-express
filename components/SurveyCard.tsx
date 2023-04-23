import React from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { deleteSurvey } from '../services/SurveyService';

interface CardProps {
  data: SurveyData;
}

const SurveyCard: React.FC<CardProps> = ({ data }) => {
  const handleDeleteSurvey = (id: number | undefined) => {
    deleteSurvey(id)
      .then(response => {
        if(response)
          console.log("deleted");
      });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
        <ListGroup>
          {data.options.map(option => (
            <ListGroupItem key={option.index}>{option.name}</ListGroupItem>
          ))}
        </ListGroup>
        <Button variant="primary">Vote</Button>
        <Button onClick={() => handleDeleteSurvey(data.id)} variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default SurveyCard;
