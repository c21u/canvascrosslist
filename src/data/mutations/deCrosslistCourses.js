import Canvas from 'canvas-lms-api';
import jwt from 'jsonwebtoken';
import {
  GraphQLID as StringType,
  GraphQLList as ListType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import config from '../../config';

const canvas = new Canvas(config.canvas.url, {
  accessToken: config.canvas.token,
});

const decrosslist = {
  type: StringType,
  args: {
    sectionIds: { type: new NonNull(new ListType(StringType)) },
  },
  resolve(obj, args, ctx) {
    const userid = ctx.user
      ? ctx.user.custom_canvas_user_id
      : jwt.verify(ctx.token, config.auth.jwt.secret).custom_canvas_user_id;

    return Promise.all(
      args.sectionIds.map(sectionId =>
        canvas.delete(`sections/${sectionId}/crosslist`, {
          as_user_id: userid,
        }),
      ),
    )
      .then(() => 'OK')
      .catch(err => {
        throw err;
      });
  },
};

export default decrosslist;
