import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../../components/layout/Layout';
import VoteForm from '../../../components/VoteForm';
import { useRouter } from 'next/router'
import { getSurveyById } from '../../../services/SurveyService';

const Vote: React.FC = () => {
  const router = useRouter()
  const [survey, setSurvey] = useState<SurveyData>();
  const { id } = router.query;

  useEffect(() => {
    if(id) {
      getSurveyById(Number(id)).then(survey => {
        setSurvey(survey);
      })
    }
  }, [id]);
  
  return (
    <Layout>
      <div className="container mrgnbtm">
        {survey && <VoteForm survey={survey}/>}
      </div>
    </Layout>
  );
}

export default Vote;
