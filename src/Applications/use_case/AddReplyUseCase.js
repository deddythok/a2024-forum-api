const NewReply = require('../../Domains/replies/entities/NewReply');

class AddReplyUseCase {
  constructor({ replyRepository, commentRepository }) {
    this._replyRepository = replyRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const newReply = new NewReply(useCasePayload);
    const isCommentExist = await this._commentRepository.isCommentExist(newReply.commentId);

    if (!isCommentExist) {
      throw new Error('ADD_REPLY_USE_CASE.COMMENT_NOT_FOUND');
    }

    return this._replyRepository.addReply(newReply);
  }
}

module.exports = AddReplyUseCase;
