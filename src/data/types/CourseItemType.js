import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLID as IDType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TermItemType from './TermItemType';

const CourseItemType = new ObjectType({
  name: 'CourseItem',
  fields: {
    id: { type: new NonNull(IDType) },
    name: { type: new NonNull(StringType) },
    sis_course_id: { type: StringType },
    course_code: { type: new NonNull(StringType) },
    workflow_state: { type: new NonNull(StringType) },
    total_students: { type: new NonNull(IntType) },
    term: { type: TermItemType },
  },
});

export default CourseItemType;
