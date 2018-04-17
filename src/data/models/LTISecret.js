import DataType from 'sequelize';
import Model from '../sequelize';

const LTISecret = Model.define('LTISecret', {
  key: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },

  secret: {
    type: DataType.STRING,
    allowNull: false,
  },
});

export default LTISecret;
