import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLID as IDType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { GraphQLDateTime as DateType } from 'graphql-iso-date';

const FullSectionItemType = new ObjectType({
  name: 'FullSectionItem',
  fields: {
    id: { type: new NonNull(IDType) },
    course_id: { type: new NonNull(StringType) },
    sis_course_id: { type: new NonNull(StringType) },
    nonxlist_course_id: { type: new NonNull(StringType) },
    name: { type: new NonNull(StringType) },
    start_at: { type: DateType },
    end_at: { type: DateType },
  },
});

export default FullSectionItemType;
