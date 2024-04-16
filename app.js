const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics_controllers")
const { getAllEndpoints } = require("./controllers/endpoints_controllers")
const { getArticleById, getAllArticles,patchArticleById } = require("./controllers/articles_controllers")
const { getCommentsByArticleId,postCommentByArticleId } = require("./controllers/comments_controllers")
const {handleCustomErrors,handlePsqlErrors,handleServerErrors,} = require('./errors/index');

app.use(express.json());

app.get("/api",getAllEndpoints)

app.get("/api/topics", getAllTopics)

app.get("/api/articles", getAllArticles)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles/:article_id/comments", getCommentsByArticleId )
app.post("/api/articles/:article_id/comments", postCommentByArticleId )
app.patch("/api/articles/:article_id",patchArticleById)

app.get("*",(req,res,next) => {
    res.status(404).send({ msg: "Route does not exist" })
})


app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app