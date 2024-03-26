import conn from './conn.js'
//ya exportadas 
//get posts
export async function getAllPosts() {
  const [rows] = await conn.query('SELECT title, content, episode, nameFight, nameSoundtrack, fightVideo FROM blog_posts')
  return rows
}

//create posts
export async function createPost(title, content, episode, nameFight, nameSoundtrack, fightVideo) {
  console.log("Datos:", title, content, episode, nameFight, nameSoundtrack, fightVideo);
  const [result] = await conn.query(
    'INSERT INTO blog_posts (title, content, episode, nameFight, nameSoundtrack, fightVideo) VALUES (?, ?, ?, ?, ?, ?)',
    [title, content, episode, nameFight, nameSoundtrack, fightVideo]
  );
  if (result.affectedRows === 1) {
    console.log("Post creado");
    return { message: "Post creado :)" };
  } else {
    console.error("Error al crear el post:", result);
    throw new Error("Error :("); 
  }
}

//delete posts (id)
export async function deletePost(id) {
    const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id]);
    return result;
  }

//get posts (id)
export async function getPostById(postId) {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [postId]);
    return rows[0] || null; 
}

//update (para put) posts
export async function updatePostById(postId, upPost) {
    const { title, content, episode, nameFight, nameSoundtrack, fightVideo } = upPost;
    const [result] = await conn.query(
      `UPDATE blog_posts 
      SET title = ?, content = ?, episode = ?, nameFight = ?, nameSoundtrack = ?, fightVideo = ? 
      WHERE id = ?`,
      [title, content, episode, nameFight, nameSoundtrack, fightVideo, postId]
    );
  
    if (result.affectedRows === 0) {
      return null; //error
    }
  
    return { ...upPost, id: postId };
} 