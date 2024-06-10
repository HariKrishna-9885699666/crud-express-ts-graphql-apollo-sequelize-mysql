import { GraphQLError } from 'graphql';
import { Post } from '../models/post';
import { Employee } from '../models/employee';

const postResolver = {
  Mutation: {
    // Post Mutations
    createPost: async (
      _: any,
      {
        title,
        content,
        employeeId
      }: {
        title: string;
        content: string;
        employeeId: number;
      }
    ) => {
      // Check if employee exists
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        throw new GraphQLError('Employee not found', {
          extensions: {
            code: 'EMPLOYEE_NOT_FOUND',
            invalidArgs: ['employeeId'],
          },
        });
      }

      // Create post with validation
      try {
        return await Post.create({
          title,
          content,
          employeeId
        });
      } catch (error: any) {
        if (error.name === 'SequelizeValidationError') {
          const messages = error.errors.map((e: any) => e.message);
          throw new GraphQLError(messages.join(', '), {
            extensions: {
              code: 'INVALID_INPUT',
              invalidArgs: ['title', 'content'],
            },
          });
        }
        throw new GraphQLError('Error creating post', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            originalError: error,
          },
        });
      }
    },
    updatePost: async (
      _: any,
      {
        id,
        title,
        content
      }: {
        id: number;
        title?: string;
        content?: string;
      }
    ) => {
      // Check if post exists
      const post = await Post.findByPk(id);
      if (!post) {
        throw new GraphQLError('Post not found', {
          extensions: {
            code: 'POST_NOT_FOUND',
            invalidArgs: ['id'],
          },
        });
      }

      // Update post with validation
      try {
        await post.update({
          title,
          content
        });
        return post;
      } catch (error: any) {
        if (error.name === 'SequelizeValidationError') {
          const messages = error.errors.map((e: any) => e.message);
          throw new GraphQLError(messages.join(', '), {
            extensions: {
              code: 'INVALID_INPUT',
              invalidArgs: ['title', 'content'],
            },
          });
        }
        throw new GraphQLError('Error updating post', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            originalError: error,
          },
        });
      }
    },
    deletePost: async (_: any, { id }: { id: number }) => {
      // Check if post exists
      const post = await Post.findByPk(id);
      if (!post) {
        throw new GraphQLError('Post not found', {
          extensions: {
            code: 'POST_NOT_FOUND',
            invalidArgs: ['id'],
          },
        });
      }

      // Delete post
      try {
        await post.destroy();
        return true;
      } catch (error: any) {
        throw new GraphQLError('Error deleting post', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            originalError: error,
          },
        });
      }
    },
  }
};

export default postResolver;
