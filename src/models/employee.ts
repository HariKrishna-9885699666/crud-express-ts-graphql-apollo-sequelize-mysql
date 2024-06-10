import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Post } from './post';

export class Employee extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public age!: number;
  public phoneNumber!: string;
  public email!: string;
  public jobLocation!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name cannot be empty",
        },
        len: {
          args: [1, 128],
          msg: "First name must be between 1 and 128 characters",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name cannot be empty",
        },
        len: {
          args: [1, 128],
          msg: "Last name must be between 1 and 128 characters",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Age must be an integer",
        },
        min: {
          args: [18],
          msg: "Age must be at least 18",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone number cannot be empty",
        },
        is: {
          args: /^\+?[1-9]\d{1,14}$/,
          msg: "Phone number must be valid",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email must be valid",
        },
      },
    },
    jobLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Job location cannot be empty",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "Employees",
  }
);

Employee.hasMany(Post, { foreignKey: 'employeeId', as: 'posts' });
