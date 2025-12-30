import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders loading initially', () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
