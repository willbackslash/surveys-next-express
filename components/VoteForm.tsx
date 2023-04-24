import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { saveVote } from '../services/SurveyService';

interface VoteFormProps {
  survey: SurveyData;
}

const VoteForm: React.FC<VoteFormProps> = ({ survey }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [votedSuccessfully, setVotedSuccessfully] = useState<boolean>(false);

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
  };

  const handleVote = () => {
    if (selectedOption) {
      saveVote(selectedOption).then(response => {
        if (response.ok) {
          setVotedSuccessfully(true);
        } else {
          response.json().then(body => setErrorMessage(body.message));
        }
      });
    }
  };

  if (survey == undefined) return <>Loading ...</>;

  return (
    <div>
      <h2>{survey.name}</h2>
      <p>{survey.description}</p>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {votedSuccessfully && (
        <Alert variant="success">You have voted successfully!</Alert>
      )}
      <Form>
        {survey.options.map(option => (
          <Form.Check
            key={option.index}
            type="radio"
            label={option.name}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
          />
        ))}
        <Button variant="primary" onClick={handleVote}>
          Vote
        </Button>
      </Form>
    </div>
  );
};

export default VoteForm;
