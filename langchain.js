import { ChatGroq } from "@langchain/groq";
import { config } from 'dotenv';
import { SqlDatabase } from "langchain/sql_db";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from '@langchain/core/output_parsers';
import { createSqlQueryChain } from "langchain/chains/sql_db";
import { DataSource } from "typeorm";
import {PromptTemplate } from "@langchain/core/prompts";

config();

const llm = new ChatGroq({
  model: "mixtral-8x7b-32768",
  temperature: 0.5,
});

const datasource = new DataSource({
  type: "postgres",
  url: process.env.DIRECT_URL,
});
const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
});

// const chain = await createSqlQueryChain({
//   llm,
//   db,
//   dialect: "postgres",
// });

const SYSTEM_PROMPT_2 = `You are a {dialect} expert. Given an input question, create a syntactically correct {dialect} query to run.
Unless the user specifies in the question a specific number of examples to obtain, query for at most {top_k} results using the LIMIT clause as per {dialect}. You can order the results to return the most informative data in the database.
Never query for all columns from a table. You must query only the columns that are needed to answer the question. Wrap each column name in double quotes (") to denote them as delimited identifiers.
Pay attention to use only the column names you can see in the tables below. Be careful to not query for columns that do not exist. Also, pay attention to which column is in which table.
Pay attention to use date('now') function to get the current date, if the question involves "today".User \ carefully, dont use \ more than once. Do not provide explanation. Do not give results like  '\n' +
    ''''sql\n' +
    'INSERT INTO "public"."User" (firstName, updatedAt, createdAt) \n' +
    "VALUES ('Gibir', date('now'), date('now'));\n" +
    ''''', give me results only and only like INSERT INTO "public"."User" (firstName, updatedAt, createdAt)
VALUES ('Gibir', date('now'), date('now')); its an example to make you explain how to return the result, and use double quotes (") to wrap each column name in for example  INSERT INTO "public"."User" ("email", "updatedAt", "createdAt") VALUES ('gibir@email.com', date('now'), date('now'));
 as i did in for the email, firstName, createdAt always remember, do not forget ever, this is very very important, whenever i give any question to you create query specifically for the database each word should be related to the database, and all column names should be in double quotes, in these types of examples SELECT "url" FROM "public"."Media" LIMIT 5;
DELETE FROM "public"."Media" WHERE id = (SELECT id FROM "public"."Media" ORDER BY createdAt DESC LIMIT 1 OFFSET 3); in these ORDER BY createdAt DESC createdAt is column name should be wrapped in double quotes, now should look like SELECT "url" FROM "public"."Media" LIMIT 5;
DELETE FROM "public"."Media" WHERE id = (SELECT id FROM "public"."Media" ORDER BY "createdAt" DESC LIMIT 1 OFFSET 3);

Only use the following tables:
{table_info}

Write an initial draft of the query. Then double check the {dialect} query for common mistakes, including:
- Using NOT IN with NULL values
- Using UNION when UNION ALL should have been used
- Using BETWEEN for exclusive ranges
- Data type mismatch in predicates
- Properly quoting identifiers
- Using the correct number of arguments for functions
- Casting to the correct data type
- Using the proper columns for joins

Use format:

First draft: <<FIRST_DRAFT_QUERY>>
Final answer: <<FINAL_ANSWER_QUERY>>`;

const prompt2 = await PromptTemplate.fromTemplate(
  `System: ${SYSTEM_PROMPT_2}

Human: {input}`
).partial({ dialect: "postgres" });

const parseFinalAnswer = (output) =>
  output.split("Final answer: ")[1];

const chain2 = (
  await createSqlQueryChain({
    llm,
    db,
    prompt: prompt2,
    dialect: "postgres",
  })
).pipe(parseFinalAnswer);

const query2 = await chain2.invoke({
  question:
    `List the media files`,
});
console.log("query2", query2);
/**
query2 SELECT AVG("Total") FROM "Invoice" WHERE "CustomerId" IN (SELECT "CustomerId" FROM "Customer" WHERE "Country" = 'USA' AND "Fax" IS NULL) AND date("InvoiceDate") BETWEEN date('2003-01-01') AND date('2009-12-31') LIMIT 5
 */
console.log("db query results", await db.run(query2));
	