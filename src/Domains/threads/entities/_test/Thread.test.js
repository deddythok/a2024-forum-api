const Thread = require('../Thread');
const Comment = require('../../../comments/entities/Comment');

describe('Thread', () => {
  const validPayload = {
    id: 'thread-123',
    title: 'Thread Title',
    body: 'Thread Body',
    date: '2020-01-01',
    username: 'user123',
  };

  it('should create Thread object correctly', () => {
    const thread = new Thread(validPayload);

    expect(thread.id).toEqual(validPayload.id);
    expect(thread.title).toEqual(validPayload.title);
    expect(thread.body).toEqual(validPayload.body);
    expect(thread.date).toEqual(validPayload.date);
    expect(thread.username).toEqual(validPayload.username);
    expect(thread.comments).toEqual([]);
  });

  it('should throw an error when payload did not contain needed property', () => {
    const payload = { ...validPayload };
    delete payload.id;

    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error when payload does not meet data type specification', () => {
    const payload = { ...validPayload, id: 123 };

    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should set comments correctly', () => {
    const thread = new Thread(validPayload);
    const commentPayload = {
      id: 'comment-123',
      username: 'user123',
      date: '2020-01-01',
      content: 'Comment content',
      isDelete: false,
    };
    const comments = [new Comment(commentPayload), new Comment(commentPayload)];
  
    thread.setComments(comments);
  
    expect(thread.comments).toEqual(comments);
  });

  it('should throw an error when comments is not an array', () => {
    const thread = new Thread(validPayload);

    expect(() => thread.setComments({})).toThrowError('THREAD.COMMENTS_NOT_ARRAY');
  });

  it('should throw an error when comments array contains invalid member', () => {
    const thread = new Thread(validPayload);
    
    // Buat satu instance Comment yang valid
    const validCommentPayload = {
      id: 'comment-123',
      username: 'user123',
      date: '2020-01-01',
      content: 'Comment content',
      isDelete: false,
    };
    const validComment = new Comment(validCommentPayload);
  
    // Buat array yang mengandung satu instance Comment yang valid dan satu objek biasa
    const comments = [validComment, { not: 'a valid comment' }];
  
    // Tes harus melemparkan error yang diharapkan
    expect(() => thread.setComments(comments)).toThrowError('THREAD.COMMENTS_CONTAINS_INVALID_MEMBER');
  });
  
});
