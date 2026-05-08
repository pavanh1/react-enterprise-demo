import { describe, it, expect } from 'vitest';
import UserCard from '../components/UserCard';
import { render, screen } from '@testing-library/react';

describe('UserCard Component', () => {
  it('renders user card with name', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      company: { name: 'Acme Corp' }
    };

    render(<UserCard user={user} />);
    const heading = screen.getByRole('heading', { name: /John Doe/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders user email', () => {
    const user = {
      id: 1,
      name: 'Jane Smith',
      email: 'jane@example.com',
      company: { name: 'Tech Inc' }
    };

    render(<UserCard user={user} />);
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('renders user company name', () => {
    const user = {
      id: 1,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      company: { name: 'StartUp LLC' }
    };

    render(<UserCard user={user} />);
    expect(screen.getByText('StartUp LLC')).toBeInTheDocument();
  });

  it('handles missing company gracefully', () => {
    const user = {
      id: 1,
      name: 'Alice Brown',
      email: 'alice@example.com',
      company: null
    };

    render(<UserCard user={user} />);
    expect(screen.getByText('No company')).toBeInTheDocument();
  });
});
