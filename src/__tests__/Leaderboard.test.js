import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Leaderboard from '../components/Leaderboard';

const mockStore = configureStore([]);

describe('Leaderboard Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          questions: ['q1', 'q2'],
          answers: {
            'q3': 'optionOne',
            'q4': 'optionTwo',
            'q5': 'optionTwo'
          }
        },
        tylermcginnis: {
          id: 'tylermcginnis',
          name: 'Tyler McGinnis',
          questions: ['q3'],
          answers: {
            'q1': 'optionOne',
            'q2': 'optionTwo'
          }
        }
      }
    });
  });

  test('displays correct user statistics', () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    // Check Sarah's stats
    const sarahRow = screen.getByText('Sarah Edo').closest('tr');
    expect(sarahRow).toHaveTextContent('2'); // Questions asked
    expect(sarahRow).toHaveTextContent('3'); // Questions answered
    expect(sarahRow).toHaveTextContent('5'); // Total score

    // Check Tyler's stats
    const tylerRow = screen.getByText('Tyler McGinnis').closest('tr');
    expect(tylerRow).toHaveTextContent('1'); // Questions asked
    expect(tylerRow).toHaveTextContent('2'); // Questions answered
    expect(tylerRow).toHaveTextContent('3'); // Total score
  });
}); 