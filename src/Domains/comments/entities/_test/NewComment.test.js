const NewComment = require('../NewComment');

describe('NewComment', () => {
  it('should create NewComment object correctly', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 'Comment content',
      owner: 'user-123',
    };

    // Action
    const newComment = new NewComment(payload);

    // Assert
    expect(newComment.threadId).toEqual(payload.threadId);
    expect(newComment.content).toEqual(payload.content);
    expect(newComment.owner).toEqual(payload.owner);
  });

  it('should throw an error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'Comment content',
      owner: 'user-123',
    };

    // Action & Assert
    expect(() => new NewComment(payload)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error when payload does not meet data type specification', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 'Comment content',
      owner: 123, // should be string
    };

    // Action & Assert
    expect(() => new NewComment(payload)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
