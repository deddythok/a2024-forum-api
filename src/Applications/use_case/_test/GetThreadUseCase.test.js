const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const GetThreadUseCase = require('../GetThreadUseCase');

describe('GetThreadUseCase', () => {
  it('should throw an error when thread not found', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(null));
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: {},
    });

    // Action & Assert
    await expect(getThreadUseCase.execute('thread-123')).rejects.toThrowError('GET_THREAD_USE_CASE.THREAD_NOT_FOUND');
  });

  it('should return thread correctly when the thread exists', async () => {
    // Arrange
    const mockThread = {
      id: 'thread-123',
      title: 'thread title',
      body: 'thread body',
      // ... other thread properties
      setComments: jest.fn(),
    };
    const mockComments = [
      { id: 'comment-123', content: 'a comment', owner: 'user-123' },
      // ... other comments
    ];

    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(mockThread));

    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.getCommentsByThreadId = jest.fn().mockImplementation(() => Promise.resolve(mockComments));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const thread = await getThreadUseCase.execute('thread-123');

    // Assert
    expect(thread).toEqual(mockThread);
    expect(mockThread.setComments).toHaveBeenCalledWith(mockComments);
  });
});
