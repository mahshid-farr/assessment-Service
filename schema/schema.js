const graphql = require('graphql');
const graphqlIsoDate = require('graphql-iso-date');
const Assessment = require('../model/assessment');
const AssessmentType = require('../model/assessmentType');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInputObjectType
} = graphql;

const{
    GraphQLDateTime
} = graphqlIsoDate;

const AssType = new GraphQLObjectType({
    name: 'AssessmentType',
    fields: ( ) => ({
        id: { type: GraphQLID },
        assessment_type: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        session: { type: GraphQLString },
        estCompletionTime: { type: GraphQLInt },
        avgCompletionTime: { type: GraphQLInt },
        userAttempts: { type: GraphQLInt },
        xp: { type: GraphQLInt },
        allowedAttempts: { type: GraphQLInt }
    })
});

const AssessmentType = new GraphQLObjectType({
    name: 'Assessment',
    fields: ( ) => ({
        id: { type: GraphQLID },
        assessment_type: {
            type: AssType,
            resolve(parent, args){
                return AssessmentType.findById(parent.authorId);
            }
        },
        token_access_key: { type: GraphQLString },
        estimated_time: { type: GraphQLInt },
        rewards: new GraphQLInputObjectType({
            name:'rewards',
            fields:{
                badge_id:{
                    type: BadgeType,
                    resolve(parent, args){
                    return Author.findById(parent.badge_id);
                    }
                },
                badge_count: { type: GraphQLInt }
            }
        }),
        status: { type: GraphQLBoolean },
        assessment_result:{ type: GraphQLString },
        start_time:{type: GraphQLDateTime},
        end_time:{type: GraphQLDateTime}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        badge: {
            type: BadgeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Badge.findById(args.id);
            }
        },
        badges: {
            type: new GraphQLList(BadgeType),
            resolve(parent, args){
                return Badge.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBadge: {
            type: BadgeType,
            args: {
                title: { type: GraphQLString },
                image_URL: { type: GraphQLString }
            },
            resolve(parent, args){
                let badge = new Badge({
                    title: args.title,
                    image_URL: args.image_URL
                });
                return badge.save();
            }
        },
       addAssessment: {
            type: AssessmentType,
            args: {
                assessment_type: { type: GraphQLString },
                token_access_key: { type: GraphQLString },
                estimated_time: { type: GraphQLInt },
                rewards: new GraphQLInputObjectType({
                    name:'rewards',
                    fields:{
                        badge_id:{ type: GraphQLID },
                        badge_count: { type: GraphQLInt }
                    }
                }),
                /*rewards:{
                    badge_id:{ type: GraphQLID },
                    badge_count: { type: GraphQLInt }
                },*/
                status: { type: GraphQLBoolean },
                assessment_result:{ type: GraphQLString },
                start_time:{type: GraphQLDateTime},
                end_time:{type: GraphQLDateTime}
            },
            resolve(parent, args){
                let assessment = new Assessment({
                    assessment_type: args.assessment_type,
                    token_access_key: args.token_access_key,
                    estimated_time: args.estimated_time,
                    rewards:{
                        badge_id: args.badge_id,
                        badge_count: args.badge_count
                    },
                    status: args.status,
                    assessment_result: args.assessment_result,
                    start_time: args.start_time,
                    end_time: args.end_time,
                });
                return assessment.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});