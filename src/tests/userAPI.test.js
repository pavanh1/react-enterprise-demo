import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUsers } from '../api/userAPI';
import axios from 'axios';

vi.mock('axios');

describe('userAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchUsers returns user data', async () => {
    const mockUsers = [
      { id: 1, name: 'User 1', email: 'user1@example.com', company: { name: 'Company 1' } },
      { id: 2, name: 'User 2', email: 'user2@example.com', company: { name: 'Company 2' } }
    ];

    axios.get.mockResolvedValue({ data: mockUsers });

    const result = await fetchUsers();

    expect(result).toEqual(mockUsers);
    expect(axios.get).toHaveBeenCalledOnce();
  });

  it('fetchUsers calls correct API endpoint', async () => {
    axios.get.mockResolvedValue({ data: [] });

    await fetchUsers();

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/users'));
  });

  it('fetchUsers handles empty response', async () => {
    axios.get.mockResolvedValue({ data: [] });

    const result = await fetchUsers();

    expect(result).toEqual([]);
  });
});
