class ReplyRepository {
    async addReply(newReply) {
      throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async isReplyExist(replyId) {
      throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async getRepliesByCommentId(commentId) {
      throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  }
  
  module.exports = ReplyRepository;
  