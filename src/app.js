const express = require("express");
const cors = require("cors");
const {  v4:uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  
  const repository = {id: uuid(),title,url,techs,likes: 0}

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url,techs} = request.body;

  const repoIndex = repositories.findIndex(repository => repository.id===id)
  if(repoIndex < 0) {
    return response.status(400).json({error: 'Repo not found'})
  }

  repositories[repoIndex].title=title;
  repositories[repoIndex].url = url;  
  repositories[repoIndex].techs = techs;  
 
  return response.json(repositories[repoIndex])

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;


  const repoIndex = repositories.findIndex(repository => repository.id===id)
  if(repoIndex < 0) {
    return response.status(400).json({error: 'Repo not found'})
  }

  repositories.splice(repoIndex,1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repoIndex = repositories.findIndex(repository => repository.id===id)
  if(repoIndex < 0) {
    return response.status(400).json({error: 'Repo not found'})
  }

  repositories[repoIndex].likes +=1;
  return response.json(repositories[repoIndex]);
});

module.exports = app;
