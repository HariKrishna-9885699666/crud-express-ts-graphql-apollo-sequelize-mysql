import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Comment extends Model {
  public id!: number;
  public content!: string;
  public postId!: number;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Content cannot be empty',
        },
        len: {
          args: [1, 1024],
          msg: 'Content max length is 500 characters',
        },
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Post ID must be an integer',
        },
        notNull: {
          msg: 'Post ID is required',
        },
      }
    }
  },
  {
    sequelize: sequelize,
    tableName: 'Comments'
  }
);
