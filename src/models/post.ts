import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust the path according to your setup
import { Comment } from './comment'; // Import Employee model to establish associations

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  employeeId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public employeeId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty"
        },
        len: {
          args: [1, 128],
          msg: "Title max length is 50 characters"
        }
      }
    },
    content: {
      type: new DataTypes.STRING(1024),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Content cannot be empty"
        },
        len: {
          args: [1, 500],
          msg: "Content max length is 500 characters"
        }
      }
    },
    employeeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Employee ID must be an integer"
        },
        notNull: {
          msg: "Employee ID is required"
        }
      }
    },
  },
  {
    tableName: 'posts',
    sequelize, // passing the `sequelize` instance is required
  }
);

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });