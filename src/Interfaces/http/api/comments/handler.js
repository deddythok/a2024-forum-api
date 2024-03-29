const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');

class CommentsHandler {
  constructor(container) {
    this._container = container;
  }

  async postCommentHandler(request, h) {
    const { id: owner } = request.auth.credentials;
    const { content } = request.payload;
    const { id: threadId } = request.params;

    const useCase = this._container.getInstance(AddCommentUseCase.name);

    const addedComment = await useCase.execute({
      threadId,
      content,
      owner,
    });

    const response = h.response({
      status: 'success',
      message: 'Komentar berhasil ditambahkan',
      data: {
        addedComment,
      },
    });

    response.code(201);
    return response;
  }

  async deleteCommentHandler(request) {
    const { id: owner } = request.auth.credentials;
    const { threadId, commentId: id } = request.params;

    /**
     * @TODO 9
     * Eksekusi useCase DeleteCommentUseCase untuk menjalankan aksi **menghapus komentar**
     *
     * Untuk mendapatkan useCase, pastikan Anda memanfaatkan method `this._container.getInstance`
     */
    const useCase = this._container.getInstance(DeleteCommentUseCase.name);
    await useCase.execute({ id, owner, threadId });

    return {
      status: 'success',
      message: 'Komentar berhasil dihapus',
    };
  }

  async postReplyHandler(request, h) {
    const { id: owner } = request.auth.credentials;
    const { content } = request.payload;
    const { threadId, commentId } = request.params;

    const useCase = this._container.getInstance(AddReplyUseCase.name);

    const addedReply = await useCase.execute({
      threadId,
      commentId,
      content,
      owner,
    });

    const response = h.response({
      status: 'success',
      message: 'Balasan berhasil ditambahkan',
      data: {
        addedReply,
      },
    });

    response.code(201);
    return response;
  }
}

module.exports = CommentsHandler;
