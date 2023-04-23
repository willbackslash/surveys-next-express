import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SurveyForm from '../../components/SurveyForm';
import { Header } from '../../components/Header';


interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const SurveyCreate: React.FC = () => {
  return (
    <div className="App">
      <Header></Header>
      <div className="container mrgnbtm">
        <SurveyForm></SurveyForm>
      </div>
    </div>
  );
}

export default SurveyCreate;
