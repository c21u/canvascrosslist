import Canvas from 'canvas-lms-api';
import jwt from 'jsonwebtoken';
import { GraphQLID as StringType, GraphQLNonNull as NonNull } from 'graphql';
import FullSectionType from '../types/FullSectionItemType';
import config from '../../config';

const canvas = new Canvas(config.canvas.url, {
  accessToken: config.canvas.token,
});

const uncrosslist = {
  type: FullSectionType,
  args: {
    sectionId: { type: new NonNull(StringType) },
  },
  resolve(obj, args, ctx) {
    const userid = ctx.user
      ? ctx.user.custom_canvas_user_id
      : jwt.verify(ctx.token, config.auth.jwt.secret).custom_canvas_user_id;

    return canvas
      .get(`sections/${args.sectionId}/enrollments`, {
        as_user_id: userid,
        type: 'TeacherEnrollment',
      })
      .then(enrollments => {
        if (
          enrollments
            // pull out the user_ids and make them strings
            .map(enrollment => `${enrollment.user_id}`)
            .includes(userid)
        ) {
          // The user can only uncrosslist as themselves if they still have an enrollment in the original course so we do this as admin
          return canvas.delete(`sections/${args.sectionId}/crosslist`);
        }
        return canvas
          .get('accounts/self/admins', { user_id: [userid] })
          .then(admins => {
            if (admins.length > 0) {
              return canvas.delete(`sections/${args.sectionId}/crosslist`);
            }

            throw new Error('Permission Denied');
          });
      });
  },
};

export default uncrosslist;
