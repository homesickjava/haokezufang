package cn.itcast.graphql.demo;

import cn.itcast.graphql.vo.Card;
import cn.itcast.graphql.vo.User;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.Scalars;
import graphql.schema.*;

public class GrapHqlDemo {

    public static void main(String[] args) {

        GraphQLObjectType userObjectType = GraphQLObjectType.newObject()
                .name("User")
                .field(GraphQLFieldDefinition.newFieldDefinition().name("id").type(Scalars.GraphQLLong))
                .field(GraphQLFieldDefinition.newFieldDefinition().name("name").type(Scalars.GraphQLString))
                .field(GraphQLFieldDefinition.newFieldDefinition().name("age").type(Scalars.GraphQLInt))
                .build();


        GraphQLFieldDefinition userFieldDefinition = GraphQLFieldDefinition.newFieldDefinition()
                .name("user")
                .type(userObjectType)
                .argument(GraphQLArgument.newArgument().name("id").type(Scalars.GraphQLLong).build())
                .dataFetcher( environment -> {
                    Long id = environment.getArgument("id");
                    Card card = new Card("123456789", id);
                    //查询数据库
                    //先模拟实现
                    return new User(id,"zhangsan"+id,21+id.intValue(),card);
                })
                .build();

        GraphQLObjectType userQueryObjectType = GraphQLObjectType.newObject()
                .name("UserQuery")
                .field(userFieldDefinition)
                .build();

        GraphQLSchema graphQLSchema = GraphQLSchema.newSchema().query(userQueryObjectType).build();

        GraphQL graphQL = GraphQL.newGraphQL(graphQLSchema).build();

        String query = "{user(id:100){id,name}}";
        ExecutionResult result = graphQL.execute(query);

        System.out.println("query: "+query);
        System.out.println(result.getErrors());
    }
}
