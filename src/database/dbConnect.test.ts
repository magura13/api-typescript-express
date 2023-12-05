import mongoose from 'mongoose';
import { DbConnection } from './dbConnect';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
}));

describe('DbConnection', () => {
  it('connects to the database successfully', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValue(null);

    await DbConnection.getInstance().connect();
    expect(mongoose.connect).toHaveBeenCalled();
  });

  it('disconnects from the database successfully', async () => {
    (mongoose.disconnect as jest.Mock).mockResolvedValue(null);

    await DbConnection.getInstance().disconnect();
    expect(mongoose.disconnect).toHaveBeenCalled();
  });
});
