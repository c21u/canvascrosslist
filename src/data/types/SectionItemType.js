import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLID as IDType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { GraphQLDateTime as DateType } from 'graphql-iso-date';

const SectionItemType = new ObjectType({
  name: 'SectionItem',
  fields: {
    id: { type: new NonNull(IDType) },
    name: { type: new NonNull(StringType) },
    enrollment_role: { type: StringType },
    nonxlist_course_id: { type: StringType },
    start_at: { type: DateType },
    end_at: { type: DateType },
  },
});

export default SectionItemType;
