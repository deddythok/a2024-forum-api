class Reply {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const {
        id, username, date, content, isDelete, commentId
      } = payload;
  
      this.id = id;
      this.username = username;
      this.date = date;
      this.content = isDelete ? '**balasan telah dihapus**' : content;
      this.commentId = commentId;
    }
  
    _verifyPayload({
      id, username, date, content, isDelete, commentId
    }) {
      if (!id || !username || !date || !content || isDelete === undefined || isDelete === null || !commentId) {
        throw new Error('REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof id !== 'string' || typeof username !== 'string' || typeof date !== 'string' || typeof content !== 'string' || typeof isDelete !== 'boolean' || typeof commentId !== 'string') {
        throw new Error('REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = Reply;