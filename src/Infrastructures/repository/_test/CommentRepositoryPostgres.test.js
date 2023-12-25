const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment', () => {
    it('should persist new comment and return added comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });

      const newComment = {
        content: 'this is comment content',
        owner: 'user-123',
        threadId: 'thread-123'
      };
      const fakeIdGenerator = () => '123';
      const repository = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedComment = await repository.addComment(newComment);

      // Assert
      expect(addedComment.id).toEqual('comment-123');
      expect(addedComment.content).toEqual(newComment.content);
      expect(addedComment.owner).toEqual(newComment.owner);

      const foundComment = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(foundComment).toBeDefined();
      expect(foundComment.id).toEqual('comment-123');
      expect(foundComment.content).toEqual(newComment.content);
      expect(foundComment.owner).toEqual(newComment.owner);
    });
  });

  describe('isCommentExist function', () => {
    it('should return true when the comment exists', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', owner: 'user-123', threadId: 'thread-123' });
  
      const repository = new CommentRepositoryPostgres(pool, {});
  
      // Action & Assert
      await expect(repository.isCommentExist('comment-123')).resolves.toBe(true);
    });
  
    it('should return false when the comment does not exist', async () => {
      // Arrange
      const repository = new CommentRepositoryPostgres(pool, {});
  
      // Action & Assert
      await expect(repository.isCommentExist('comment-123')).resolves.toBe(false);
    });
  });

  describe('isCommentOwner function', () => {
    it('should return true when the user is the owner of the comment', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', owner: 'user-123', threadId: 'thread-123' });
  
      const repository = new CommentRepositoryPostgres(pool, {});
  
      // Action & Assert
      await expect(repository.isCommentOwner('comment-123', 'user-123')).resolves.toBe(true);
    });
  });

  describe('deleteComment function', () => {
    it('should successfully delete the comment', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', owner: 'user-123', threadId: 'thread-123' });
  
      const repository = new CommentRepositoryPostgres(pool, {});
  
      // Action
      await repository.deleteComment('comment-123');
  
      // Assert
      const comment = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comment).toBeDefined();
      expect(comment.is_delete).toBe(true);
    });
  });
  
  describe('getCommentsByThreadId function', () => {
    it('should return comments correctly based on the thread id', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', owner: 'user-123', threadId: 'thread-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-124', owner: 'user-123', threadId: 'thread-123' });
  
      const repository = new CommentRepositoryPostgres(pool, {});
  
      // Action
      const comments = await repository.getCommentsByThreadId('thread-123');
  
      // Assert
      expect(comments).toHaveLength(2);
      expect(comments.map(comment => comment.id)).toEqual(['comment-123', 'comment-124']);
    });
  });
  
  
  
  
});
