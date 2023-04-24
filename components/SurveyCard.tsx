import React from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { deleteSurvey } from '../services/SurveyService';

interface CardProps {
  data: SurveyData;
  isAdmin: Boolean;
  isBasicUser: Boolean;
}

const SurveyCard: React.FC<CardProps> = ({ data, isAdmin, isBasicUser }) => {
  const handleDeleteSurvey = (id: number | undefined) => {
    if(id) {
      deleteSurvey(id)
        .then(response => {
          if(response) window.location.reload();
        });
    }
  };

  return (
    <Card className='h-100'>
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
        <ListGroup>
          {data.options.map(option => (
            <ListGroupItem key={option.index}>{option.name}</ListGroupItem>
          ))}
        </ListGroup>
        {isBasicUser && <Button className='mr-2 my-3' variant="primary" href={`/surveys/vote/${data.id}`}>Vote</Button>}
        {isAdmin && <Button className='my-3' onClick={() => handleDeleteSurvey(data.id)} variant="danger">Delete</Button>}
      </Card.Body>
    </Card>
  );
};

export default SurveyCard;
