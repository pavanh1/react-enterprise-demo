import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserPage from '../pages/UserPage';
import { render, screen, waitFor } from '@testing-library/react';
import * as userAPI from '../api/userAPI';

vi.mock('../api/userAPI');

describe('UserPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders heading', () => {
    userAPI.fetchUsers.mockResolvedValue([]);
    render(<UserPage />);
    expect(screen.getByRole('heading', { name: /Enterprise React Demo/i })).toBeInTheDocument();
  });

  it('loads and displays users', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', company: { name: 'Acme' } },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: { name: 'TechCorp' } }
    ];

    userAPI.fetchUsers.mockResolvedValue(mockUsers);

    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('calls fetchUsers on mount', async () => {
    userAPI.fetchUsers.mockResolvedValue([]);

    render(<UserPage />);

    await waitFor(() => {
      expect(userAPI.fetchUsers).toHaveBeenCalled();
    });
  });

  it('handles error gracefully', async () => {
    userAPI.fetchUsers.mockRejectedValue(new Error('API Error'));

    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Enterprise React Demo/i })).toBeInTheDocument();
    });
  });
});
