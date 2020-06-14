package cn.itcast.graphql.demo;

import cn.itcast.graphql.vo.Card;
import cn.itcast.graphql.vo.User;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import org.apache.commons.io.IOUtils;

import java.io.IOException;

public class GraphQLSDLDemo {

    public static void main(String[] args) throws IOException {

        String filename="user.graphqls";
        String fileContent = IOUtils.toString(GraphQLSDLDemo.class.getClassLoader().getResource(filename) ,"UTF-8");
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(fileContent);

        //解决数据的查询问题
        RuntimeWiring writing = RuntimeWiring.newRuntimeWiring()
                                .type("UserQuery", builder ->
                                    builder.dataFetcher("user", environment -> {
                                        Long id = environment.getArgument("id");
                                        Card card = new Card("123456789", id);
                                        return new User(id, "张三"+id, 20+id.intValue(),card);
                                    })
                                )
                                .build();
        GraphQLSchema graphQLSchema = new SchemaGenerator().makeExecutableSchema(typeRegistry,writing);

        GraphQL graphQL = GraphQL.newGraphQL(graphQLSchema).build();
        String query = "{user(id:100){id,name,age,card{cardNumber,userId}}}";
        ExecutionResult result = graphQL.execute(query);

        System.out.println("query: "+query);
        System.out.println(result.toSpecification());
    }
}
