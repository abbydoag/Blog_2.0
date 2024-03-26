import express from "express"
import {createPost, getAllPosts} from "./db.js"
const app = express()
const port = 3000

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola World!")
})
app.listen(port, () => {
  console.log("Server listening at http://127.0.0.1:${port}")
})

// POST /posts
app.post("/posts", async(req,res) =>{
  const newPost = req.body;
  console.log("Contenido post:", newPost);
  const postMade = await createPost(
    newPost.title,
    newPost.content,
    newPost.episode,
    newPost.nameFight,
    newPost.nameSoundtrack,
    newPost.fightVideo
  );
  res.status(201).json(postMade);
});

// GET /posts/
app.get("/all-posts", async(req, res) =>{
  const posts = await getAllPosts();
  if (posts.length===0) {
      return res.status(404).json({ message: "Error 404: Posts no encontrados :("});
  }
  res.json(posts);
});

// PUT /posts/:postId
app.put("/posts/:postId", async(req, res) =>{
  const {postId} = req.params;
  const upPost = req.body;
  const post = await updatePostById(postId, upPost);

  if (!post) {
      return res.status(404).json({ message: "Error 404: Post no encontrado :("});
  }
  res.json(post);
});

//DELETE /posts/:postId
app.delete("/posts/:postId", async (req, res)=>{
  const {postId} = req.params;
  const result = await deletePost(postId);

  if (result.affectedRows === 0){
    return res.status(404).json({ message: "Error 404: Post no encontrado :("});
  }
  res.status({message: "Post eliminado :)"})
});