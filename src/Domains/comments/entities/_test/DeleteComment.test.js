const DeleteComment = require('../DeleteComment');

describe('DeleteComment', () => {
  it('should create deleteComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    // Action
    const deleteComment = new DeleteComment(payload);

    // Assert
    expect(deleteComment.id).toEqual(payload.id);
    expect(deleteComment.threadId).toEqual(payload.threadId);
    expect(deleteComment.owner).toEqual(payload.owner);
  });

  it('should throw an error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
    };

    // Action & Assert
    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error when payload does not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 123, // should be string
    };

    // Action & Assert
    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
