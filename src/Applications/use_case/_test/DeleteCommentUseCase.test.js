const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should throw an error if the thread does not exist', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.isThreadExist = jest.fn().mockImplementation(() => Promise.resolve(false));

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: {},
      threadRepository: mockThreadRepository,
    });

    const payload = {
        id: 'comment-123',
        threadId: 'thread-123',
        owner: 'user-123',
      };

    // Action and Assert
    await expect(deleteCommentUseCase.execute(payload)).rejects.toThrowError('DELETE_COMMENT_USE_CASE.THREAD_NOT_FOUND');
  });

  it('should throw an error if the comment does not exist', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    mockThreadRepository.isThreadExist = jest.fn().mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.isCommentExist = jest.fn().mockImplementation(() => Promise.resolve(false));

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const payload = {
        id: 'comment-123',
        threadId: 'thread-123',
        owner: 'user-123',
      };

    // Action and Assert
    await expect(deleteCommentUseCase.execute(payload)).rejects.toThrowError('DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND');
  });

  it('should throw an error if the comment is not owned by the user', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    mockThreadRepository.isThreadExist = jest.fn().mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.isCommentExist = jest.fn().mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.isCommentOwner = jest.fn().mockImplementation(() => Promise.resolve(false));

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const payload = {
        id: 'comment-123',
        threadId: 'thread-123',
        owner: 'user-123',
      };

    // Action and Assert
    await expect(deleteCommentUseCase.execute(payload)).rejects.toThrowError('DELETE_COMMENT_USE_CASE.COMMENT_NOT_OWNED');
  });

  it('should successfully delete the comment', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    mockThreadRepository.isThreadExist = jest.fn().mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.isCommentExist = jest.fn().mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.isCommentOwner = jest.fn().mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.deleteComment = jest.fn().mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });
    
    const payload = {
        id: 'comment-123',
        threadId: 'thread-123',
        owner: 'user-123',
      };
    
      // Action
      await deleteCommentUseCase.execute(payload);
    
      // Assert
      expect(mockCommentRepository.deleteComment).toBeCalledWith('comment-123');
    });
});
