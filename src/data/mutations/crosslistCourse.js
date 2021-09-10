import Canvas from 'canvas-lms-api';
import jwt from 'jsonwebtoken';
import { GraphQLID as StringType, GraphQLNonNull as NonNull } from 'graphql';
import FullSectionType from '../types/FullSectionItemType';
import config from '../../config';
import logger from '../logger.js';

const crosslist = {
  type: FullSectionType,
  args: {
    targetId: { type: new NonNull(StringType) },
    sectionId: { type: new NonNull(StringType) },
  },
  resolve(obj, args, ctx) {
    const user = ctx.user
      ? ctx.user
      : jwt.verify(ctx.token, config.auth.jwt.secret);

    const canvas = new Canvas(user.custom_canvas_api_baseurl, {
      accessToken: config.canvas.token,
    });

    const userid = user.custom_canvas_user_id;

    return canvas.post(
      `sections/${args.sectionId}/crosslist/${args.targetId}`,
      {
        as_user_id: userid,
      },
    ).then(() => {
      logger.info({action: "crosslist", user: userid, section: args.sectionId, course: args.targetId }, "Section Crosslisted")
    });
  },
};

export default crosslist;
