// import { ApolloError, UserInputError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { Employee } from "../models/employee";
import { Post } from "../models/post";
import { Comment } from "../models/comment";

const employeeResolver = {
  Query: {
    getEmployees: async () => {
      return await Employee.findAll({
        include: [
          {
            model: Post,
            as: "posts", // Alias for the included posts
            include: [
              {
                model: Comment,
                as: "comments", // Alias for comments associated with posts
              },
            ],
          },
        ],
      });
    },
    getEmployee: async (_: any, { id }: { id: number }) => {
      const employee = await Employee.findByPk(id, {
        include: [
          {
            model: Post,
            as: "posts", // Alias for the included posts
            include: [
              {
                model: Comment,
                as: "comments", // Alias for comments associated with posts
              },
            ],
          },
        ],
      });
      if (!employee) {
        throw new GraphQLError("Employee not found", {
          extensions: { code: 'EMPLOYEE_NOT_FOUND' },
        });
      }
      return employee;
    },
  },
  Mutation: {
    createEmployee: async (_: any, args: any) => {
      try {
        // Check if an employee with the same email already exists
        const existingEmployee = await Employee.findOne({
          where: { email: args.email },
        });
        if (existingEmployee) {
          throw new GraphQLError("An employee with the same email already exists.", {
            extensions: {
              code: 'DUPLICATE_EMAIL',
              invalidArgs: ['email'],
            },
          });
        }
    
        // Create the new employee
        const newEmployee = await Employee.create(args);
        return newEmployee;
      } catch (error: any) {
        if (error instanceof GraphQLError) {
          throw error;
        } else {
          throw new GraphQLError('Error creating employee', {
            extensions: {
              code: 'EMPLOYEE_CREATION_ERROR',
              originalError: error,
            },
          });
        }
      }
    },    
    updateEmployee: async (_: any, args: any) => {
      try {
        const employee = await Employee.findByPk(args.id);
        if (!employee) {
          throw new GraphQLError(`Employee with ID ${args.id} not found`, {
            extensions: {
              code: 'EMPLOYEE_NOT_FOUND',
              invalidArgs: ['id'],
            },
          });
        }
    
        await employee.update(args);
        return employee;
      } catch (error: any) {
        if (error instanceof GraphQLError) {
          throw error;
        } else {
          throw new GraphQLError('Error updating employee', {
            extensions: {
              code: 'EMPLOYEE_UPDATE_ERROR',
              originalError: error,
            },
          });
        }
      }
    },
    
    deleteEmployee: async (_: any, args: { id: number }) => {
      try {
        const employee = await Employee.findByPk(args.id);
        if (!employee) {
          throw new GraphQLError(`Employee with ID ${args.id} not found`, {
            extensions: {
              code: 'EMPLOYEE_NOT_FOUND',
              invalidArgs: ['id'],
            },
          });
        }
    
        await employee.destroy();
        return { success: true };
      } catch (error: any) {
        if (error instanceof GraphQLError) {
          throw error;
        } else {
          throw new GraphQLError('Error deleting employee', {
            extensions: {
              code: 'EMPLOYEE_DELETE_ERROR',
              originalError: error,
            },
          });
        }
      }
    },
  },
};

export default employeeResolver;
