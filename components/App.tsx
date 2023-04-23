import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Header'
import { Users } from './Users'
import { getAllSurveys, createUser } from '../services/SurveyService'
import LoginButton from './LoginButton';
import SurveyCard from './SurveyCard';
import { Button } from 'react-bootstrap';
import { Survey } from '@prisma/client';
import SurveyForm from './SurveyForm';
import Link from 'next/link';
import Layout from './layout/Layout';
interface User {
  firstName: string;
  lastName: string;
  email: string;
}



const App: React.FC = () => {
  const [user, setUser] = useState<User>({ firstName: '', lastName: '', email: '' });
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0);

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createUser(user)
      .then(response => {
        console.log(response);
        setNumberOfUsers(prevCount => prevCount + 1);
      });
  }

  const handleGetAllSurveys = (): void => {
    getAllSurveys()
      .then(surveys => {
        console.log(surveys)
        setSurveys(surveys);
        setNumberOfUsers(surveys.length);
      });
  }

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  useEffect(() => {
    getAllSurveys().then(surveys => {
      console.log(surveys)
      setSurveys(surveys);
      setNumberOfUsers(surveys.length);
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
    <Layout className="App">
      <div className="container mrgnbtm">
        <Button href='/surveys/create' variant="primary">Create survey</Button>
      </div>
      <div className='row'>
        {surveys.map(survey => (
        <SurveyCard data={survey} />
        ))}
      </div>
    </Layout>
  );
}

export default App;
