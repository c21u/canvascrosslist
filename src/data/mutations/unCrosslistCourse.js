import Canvas from 'canvas-lms-api';
import jwt from 'jsonwebtoken';
import { GraphQLID as StringType, GraphQLNonNull as NonNull } from 'graphql';
import FullSectionType from '../types/FullSectionItemType';
import config from '../../config';
import logger from '../../logger.js';

const uncrosslist = {
  type: FullSectionType,
  args: {
    sectionId: { type: new NonNull(StringType) },
  },
  resolve(obj, args, ctx) {
    const user = ctx.user
      ? ctx.user
      : jwt.verify(ctx.token, config.auth.jwt.secret);

    const userid = user.custom_canvas_user_id;
    const gtaccount = user.custom_lis_user_username;

    const canvas = new Canvas(user.custom_canvas_api_baseurl, {
      accessToken: config.canvas.token,
    });

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
          return canvas
            .delete(`sections/${args.sectionId}/crosslist`)
            .then(() => {
              logger.info(
                {
                  action: 'uncrosslist',
                  user: userid,
                  gtaccount,
                  section: args.sectionId,
                },
                'Section UncrossListed',
              );
            });
        }
        return canvas
          .get('accounts/self/admins', { user_id: [userid] })
          .then(admins => {
            if (admins.length > 0) {
              return canvas
                .delete(`sections/${args.sectionId}/crosslist`)
                .then(() => {
                  logger.info(
                    {
                      action: 'uncrosslist',
                      user: userid,
                      gtaccount,
                      section: args.sectionId,
                    },
                    'Section UncrossListed',
                  );
                });
            }

            throw new Error('Permission Denied');
          });
      });
  },
};

export default uncrosslist;
