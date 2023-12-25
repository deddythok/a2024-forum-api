const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    // arrange
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    const mockReturnAddComment = new AddedComment({
      id: 'comment-123',
      content: 'this is content of comment',
      owner: 'user-123',
    });

    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(mockReturnAddComment));
    mockThreadRepository.isThreadExist = jest.fn(() => Promise.resolve(true));

    const useCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });
    
    const useCasePayload = {
      content: 'this is content of comment',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    const expectedAddedComment = new AddedComment({
      id: 'comment-123',
      content: 'this is content of comment',
      owner: 'user-123',
    });

    // action
    const addedComment = await useCase.execute(useCasePayload);
    
    // assert
    expect(addedComment).toEqual(expectedAddedComment);
    expect(mockThreadRepository.isThreadExist).toBeCalledWith('thread-123');
    expect(mockCommentRepository.addComment).toBeCalledWith(expect.anything());
  });

  it('should throw an error when the thread does not exist', async () => {
    // arrange
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.isThreadExist = jest.fn(() => Promise.resolve(false));

    const useCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const useCasePayload = {
      content: 'this is content of comment',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    // action & assert
    await expect(useCase.execute(useCasePayload)).rejects.toThrowError('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
  });
});
