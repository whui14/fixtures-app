import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders file upload input', () => {
  render(<App />);
  const fileInput = screen.getByLabelText(/upload/i) || screen.getByRole('button', { name: /upload/i });
  expect(fileInput).toBeInTheDocument();
});

test('renders search input field', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/search team name/i);
  expect(searchInput).toBeInTheDocument();
});

test('typing in search input updates value', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/search team name/i);
  fireEvent.change(input, { target: { value: 'Chelsea' } });
  expect(input.value).toBe('Chelsea');
});
