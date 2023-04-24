import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { createSurvey } from '../services/SurveyService';
import { useRouter } from "next/router";

const SurveyForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<Option[]>([{ index: 0, name: '' }]);
  const router = useRouter();

  const handleOptionChange = (index: number, event: React.ChangeEvent<any>) => {
    const newOptions = [...options];
    newOptions[index].name = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    const newOptions = [...options];
    newOptions.push({ index: options.length, name: '' });
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    if(options.length == 1) return;
    const newOptions = options.filter((option) => option.index !== index);
    setOptions(newOptions);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You can do whatever you want with the form data here
    const survey: SurveyCreate = { name, description, options: {create: options} };
    console.log(survey);
    createSurvey(survey)
      .then(response => {
        if(response)
          router.push("/");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formSurveyName">
        <Form.Label>Survey Name</Form.Label>
        <Form.Control type="text" placeholder="Enter survey name" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formSurveyDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter survey description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formSurveyOptions">
        <Form.Label>Options</Form.Label>
        {options.map((option, index) => (
          <Row key={index} className="my-3">
            <Col>
              <Form.Control type="text" placeholder={`Option ${index+1}`} value={option.name} onChange={(e) => handleOptionChange(index, e)} />
            </Col>
            <Col xs={2}>
              <Button variant="secondary" onClick={() => removeOption(option.index)}>Remove Option</Button>
            </Col>
            {index === options.length - 1 && (
              <Col xs={2}>
                <Button variant="secondary" onClick={addOption}>Add Option</Button>
              </Col>
            )}
          </Row>
        ))}
      </Form.Group>

      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};

export default SurveyForm;
