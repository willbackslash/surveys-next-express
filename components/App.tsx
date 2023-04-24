import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllSurveys } from '../services/SurveyService'
import SurveyCard from './SurveyCard';
import { Button, Spinner } from 'react-bootstrap';
import Layout from './layout/Layout';
import { useSession } from "next-auth/react"

const App: React.FC = () => {
  const { data: session} = useSession();
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);
  const [isBasicUser, setIsBasicUser] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    getAllSurveys().then(surveys => {
      setSurveys(surveys);
      setIsLoading(false);
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
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className='row'>
          {surveys.map(survey => (
            <div key={survey.id} className='col-md-4 mb-3'>
              <SurveyCard data={survey} isAdmin={isAdmin} isBasicUser={isBasicUser}/>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default App;
