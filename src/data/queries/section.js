import Canvas from 'canvas-lms-api';
import jwt from 'jsonwebtoken';
import FullSectionItemType from '../types/FullSectionItemType';
import config from '../../config';

const canvas = new Canvas(config.canvas.url, {
  accessToken: config.canvas.token,
});

const section = {
  type: FullSectionItemType,
  resolve(obj, args, ctx) {
    const userid = ctx.user
      ? ctx.user.custom_canvas_user_id
      : jwt.verify(ctx.token, config.auth.jwt.secret).custom_canvas_user_id;

    return canvas
      .get(`sections/${args.sectionId}`, {
        as_user_id: userid,
      })
      .catch(err => {
        throw err;
      });
  },
};

export default section;
