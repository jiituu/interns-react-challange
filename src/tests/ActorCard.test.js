import React from 'react';
import { render } from '@testing-library/react';
import ActorCard from '../Components/ActorCard';

describe('ActorCard component', () => {
  it('should render loading text when loading', () => {
    const { getByText } = render(<ActorCard />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  // Add more tests for component behavior
});
