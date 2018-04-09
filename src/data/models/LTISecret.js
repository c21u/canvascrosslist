import DataType from 'sequelize';
import Model from '../sequelize';

const LTISecret = Model.define('LTISecret', {
  key: {
    type: DataType.STRING,
  },

  secret: {
    type: DataType.STRING,
  },
});

export default LTISecret;
