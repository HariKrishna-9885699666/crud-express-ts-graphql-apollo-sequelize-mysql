import { GraphQLError } from 'graphql';
import { Comment } from '../models/comment';
import { Post } from '../models/post';

const commentResolver = {
  Mutation: {
    createComment: async (
      _: any,
      {
        content,
        postId,
      }: {
        content: string;
        postId: number;
      }
    ) => {
      // Check if post exists
      const post = await Post.findByPk(postId);
      if (!post) {
        throw new GraphQLError('Post not found', {
          extensions: {
            code: 'POST_NOT_FOUND',
            invalidArgs: ['postId'],
          },
        });
      }

      // Create comment with validation
      try {
        return await Comment.create({
          content,
          postId,
        });
      } catch (error: any) {
        if (error.name === 'SequelizeValidationError') {
          const messages = error.errors.map((e: any) => e.message);
          throw new GraphQLError(messages.join(', '), {
            extensions: {
              code: 'INVALID_INPUT',
              invalidArgs: ['content'],
            },
          });
        }
        throw new GraphQLError('Error creating comment', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            originalError: error,
          },
        });
      }
    },
    updateComment: async (
      _: any,
      {
        id,
        content,
      }: {
        id: number;
        content?: string;
      }
    ) => {
      // Check if comment exists
      const comment = await Comment.findByPk(id);
      if (!comment) {
        throw new GraphQLError('Comment not found', {
          extensions: {
            code: 'COMMENT_NOT_FOUND',
            invalidArgs: ['id'],
          },
        });
      }

      // Update comment with validation
      try {
        await comment.update({
          content,
        });
        return comment;
      } catch (error: any) {
        if (error.name === 'SequelizeValidationError') {
          const messages = error.errors.map((e: any) => e.message);
          throw new GraphQLError(messages.join(', '), {
            extensions: {
              code: 'INVALID_INPUT',
              invalidArgs: ['content'],
            },
          });
        }
        throw new GraphQLError('Error updating comment', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            originalError: error,
          },
        });
      }
    },
    deleteComment: async (_: any, { id }: { id: number }) => {
      // Check if comment exists
      const comment = await Comment.findByPk(id);
      if (!comment) {
        throw new GraphQLError('Comment not found', {
          extensions: {
            code: 'COMMENT_NOT_FOUND',
            invalidArgs: ['id'],
          },
        });
      }

      // Delete comment
      try {
        await comment.destroy();
        return true;
      } catch (error: any) {
        throw new GraphQLError('Error deleting comment', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            originalError: error,
          },
        });
      }
    },
  }
};

export default commentResolver;
