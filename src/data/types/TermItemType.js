import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLID as IDType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { GraphQLDateTime as DateType } from 'graphql-iso-date';

const TermItemType = new ObjectType({
  name: 'TermItem',
  fields: {
    id: { type: new NonNull(IDType) },
    name: { type: new NonNull(StringType) },
    sis_term_id: { type: StringType },
    start_at: { type: DateType },
    end_at: { type: DateType },
  },
});

export default TermItemType;
