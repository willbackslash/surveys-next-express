import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../components/App';

jest.mock('../services/UserService', () => ({
  getAllUsers: jest.fn().mockResolvedValue([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com' }
  ]),
  createUser: jest.fn().mockResolvedValue([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com' },
    { id: 3, firstName: 'Jane', lastName: 'Doe', email: 'testuser@example.com' }
  ])
}));

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('displays the header', () => {
    const { getByText } = render(<App />);
    expect(getByText('Next.js With NodeJS')).toBeInTheDocument();
  });

  it('displays the create user form', () => {
    const { getByLabelText, getByText } = render(<App />);
    expect(getByLabelText('First Name')).toBeInTheDocument();
    expect(getByLabelText('Last Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByText('Create User')).toBeInTheDocument();
  });

  it('displays the display board', async () => {
    let getByText;

    await act(async () => {
      const { getByText: getByTextCallback } = render(<App />);
      getByText = getByTextCallback;
    });

    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('Get all Users')).toBeInTheDocument();
  });

  it('displays the list of users', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => expect(getByText('johndoe@example.com')).toBeInTheDocument());
    expect(getByText('janedoe@example.com')).toBeInTheDocument();
  });

  it('creates a new user', async () => {
    const { getByLabelText, getByText } = render(<App />);
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'Test' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'User' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'testuser@example.com' } });
    fireEvent.click(getByText('Create'));
    await waitFor(() => expect(getByText('3')).toBeInTheDocument());
  });
});
