import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllSurveys } from '../services/SurveyService'
import SurveyCard from './SurveyCard';
import { Button } from 'react-bootstrap';
import Layout from './layout/Layout';

const App: React.FC = () => {
  const [surveys, setSurveys] = useState<SurveyData[]>([]);

  useEffect(() => {
    getAllSurveys().then(surveys => {
      console.log(surveys)
      setSurveys(surveys);
    });
  }, []);

  /*
  return (
    <div className="App">
      <Header></Header>
      <div className="container mrgnbtm">
        <Button href='/surveys/create' variant="primary">Create survey</Button>
      </div>
      <div className='row'>
        {surveys.map(survey => (
        <SurveyCard data={survey} />
        ))}
      </div>
      <SurveyForm></SurveyForm>
      <LoginButton/>
    </div>
  );*/

  return (
    <Layout>
      <div className="container mrgnbtm">
        <Button href='/surveys/create' variant="primary">Create survey</Button>
      </div>
      <div className='row'>
        {surveys.map(survey => (
          <SurveyCard key={survey.id} data={survey} />
        ))}
      </div>
    </Layout>
  );
}

export default App;
