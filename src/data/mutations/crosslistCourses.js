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

const crosslist = {
  type: StringType,
  args: {
    targetId: { type: new NonNull(StringType) },
    sectionIds: { type: new NonNull(new ListType(StringType)) },
  },
  resolve(obj, args, ctx) {
    const userid = ctx.user
      ? ctx.user.custom_canvas_user_id
      : jwt.verify(ctx.token, config.auth.jwt.secret).custom_canvas_user_id;

    return Promise.all(
      args.sectionIds.map(sectionId =>
        canvas.post(`sections/${sectionId}/crosslist/${args.targetId}`, {
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

export default crosslist;
