const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{id}/comments',
    handler: (request, h) => handler.postCommentHandler(request, h),
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: (request, h) => handler.deleteCommentHandler(request, h),
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: (request, h) => handler.postReplyHandler(request, h),
    options: {
      auth: 'forumapi_jwt',
    },
  },
];
module.exports = routes;
