const Comment = require('../Comment');

describe('Comment', () => {
  it('should create comment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'user123',
      date: '2021-01-01',
      content: 'Comment content',
      isDelete: false,
    };

    // Action
    const comment = new Comment(payload);

    // Assert
    expect(comment.id).toEqual(payload.id);
    expect(comment.username).toEqual(payload.username);
    expect(comment.date).toEqual(payload.date);
    expect(comment.content).toEqual(payload.content);
  });

  it('should create comment object correctly when isDelete is true', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'user123',
      date: '2021-01-01',
      content: 'Comment content',
      isDelete: true,
    };

    // Action
    const comment = new Comment(payload);

    // Assert
    expect(comment.content).toEqual('**komentar telah dihapus**');
  });

  it('should throw an error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      date: '2021-01-01',
      content: 'Comment content',
      isDelete: false,
    };

    // Action & Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error when payload does not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'user123',
      date: '2021-01-01',
      content: 123, // should be string
      isDelete: false,
    };

    // Action & Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
