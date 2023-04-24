import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllSurveys } from '../services/SurveyService'
import SurveyCard from './SurveyCard';
import { Button } from 'react-bootstrap';
import Layout from './layout/Layout';
import { useSession } from "next-auth/react"

const App: React.FC = () => {
  const { data: session} = useSession();
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);
  const [isBasicUser, setIsBasicUser] = useState<Boolean>(false);

  useEffect(() => {
    getAllSurveys().then(surveys => {
      console.log(surveys)
      setSurveys(surveys);
    });
  }, []);

  useEffect(() => {
    if(session){
      // @ts-ignore
      setIsAdmin(session.user?.groups?.includes('SURVEY_ADMIN'));
      // @ts-ignore
      setIsBasicUser(session.user?.groups?.includes('BASIC'));
    }
  }, [session]);

  return (
    <Layout>
      <div className="d-flex justify-content-end mb-3">
        {isAdmin && <Button href='/surveys/create' variant="primary">Create survey</Button>}
      </div>
      <div className='row'>
        {surveys.map(survey => (
          <div key={survey.id} className='col-md-4 mb-3'>
            <SurveyCard data={survey} isAdmin={isAdmin} isBasicUser={isBasicUser}/>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default App;
