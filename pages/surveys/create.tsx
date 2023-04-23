import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SurveyForm from '../../components/SurveyForm';
import Layout from '../../components/layout/Layout';

const SurveyCreate: React.FC = () => {
  return (
    <Layout>
      <div className="container mrgnbtm">
        <SurveyForm></SurveyForm>
      </div>
    </Layout>
  );
}

export default SurveyCreate;
