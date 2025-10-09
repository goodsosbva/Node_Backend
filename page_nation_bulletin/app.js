// controller
const express = require('express');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { ObjectId } = require('mongodb');

const mongodbConnection = require('./configs/mongodb-connection');
const handlebars = require('express-handlebars');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postService = require('./services/post-service');

app.engine(
  'handlebars',
  handlebars.create({
    helpers: require('./configs/handlebars-helpers'),
  }).engine
);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

let collection;
app.listen(3000, async () => {
  console.log('서버가 3000에서 실행!');

  const mongoClient = await mongodbConnection();
  collection = mongoClient.db().collection('board');
  console.log('MongoDB 접속 성공');
});

app.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || '';
  try {
    const [posts, paginator] = await postService.list(collection, page, search);

    res.render('home', { title: 'test board', search, paginator, posts });
  } catch (error) {
    console.log(error);
    res.render('home', { title: 'test board' });
  }
});

app.get('/write', async (req, res) => {
  res.render('write', { title: '글쓰기' });
});

app.post('/write', async (req, res) => {
  const post = req.body;
  const result = await postService.writePost(collection, post);
  res.redirect(`/detail/${result.insertedId}`);
});

app.get('/detail/:id', async (req, res) => {
  const result = await postService.getDetailPost(collection, req.params.id);
  res.render('detail', { title: '상세페이지', post: result.value });
});

app.post('/check-password', async (req, res) => {
  const { id, password } = req.body;

  const post = await postService.getPostByIdAndPassword(collection, {
    id,
    password,
  });

  if (!post) {
    return res.status(400).json({ isExist: false });
  } else {
    return res.json({ isExist: true });
  }
});

app.get('/write', (req, res) => {
  res.render('write', { title: '글쓰기', mode: 'create' });
});

app.get('/modify/:id', async (req, res) => {
  const post = await postService.getPostById(collection, req.params.id);
  console.log('post >> ', post);
  res.render('write', { title: '글수정', mode: 'modify', post });
});

app.post('/modify/', async (req, res) => {
  const { id, title, writer, password, content } = req.body;

  const post = {
    title,
    writer,
    password,
    content,
    createDt: new Date().toISOString(),
  };

  const result = await postService.updatePost(collection, id, post);
  res.redirect(`/detail/${id}`);
});

app.delete('/delete', async (req, res) => {
  const { id, password } = req.body;

  try {
    const result = await collection.deleteOne({ _id: ObjectId(id), password });

    if (result.deletedCount !== 1) {
      console.log('delete failed');
      return res.json({ isSuccess: false });
    }

    return res.json({ isSuccess: true });
  } catch (error) {
    console.log(error);
    return res.json({ isSuccess: false });
  }
});

app.post('/write-comment', async (req, res) => {
  const { id, name, password, comment } = req.body;
  const post = await postService.getPostById(collection, id);

  if (post.comments) {
    post.comments.push({
      name,
      password,
      comment,
      createDt: new Date().toISOString(),
    });
  } else {
    post.comments = [
      {
        idx: 1,
        name,
        password,
        comment,
        createDt: new Date().toISOString(),
      },
    ];
  }

  postService.updatePost(collection, id, post);
  return res.redirect(`/detail/${id}`);
});

app.delete('/delete-comment', async (req, res) => {
  const { id, idx, password } = req.body;

  const post = await collection.findOne(
    {
      _id: ObjectId(id),
      comments: { $elemMatch: { idx: parseInt(idx), password } },
    },
    postService.projectionOption
  );

  if (!post) {
    return res.json({ isSuccess: false });
  }

  post.comments = post.comments.filter(
    comment => comment.idx !== parseInt(idx)
  );
  postService.updatePost(collection, id, post);
  return res.json({ isSuccess: true });
});
