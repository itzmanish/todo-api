const express = require("express");
const router = express.Router();
const { Todo, User } = require("../model/todo");
const { ObjectId } = require("mongodb");
const slugify = require("slugify");
const bcrypt = require("bcrypt");
const _ = require("lodash");
router.get("/", async (req, res) => {
  Todo.find()
    .then(todos => res.status(200).json(todos))
    .catch(e => console.log(e));
});

router.post("/add-todo", async (req, res) => {
  let todo = new Todo();
  todo.title = req.body.title;
  todo.slug = slugify(req.body.title);
  todo.subtitle = req.body.subtitle;
  todo.finished = false;
  Todo.findOne({ slug: todo.slug }).then(doc => {
    if (doc) {
      return res.status(404).json("Todo already exist");
    }
    todo
      .save()
      .then(todos => {
        res.json(todos);
      })
      .catch(e => {
        console.log(e);
        res.status(404).json(e);
      });
  });
});

router.get("/:todo", async (req, res) => {
  Todo.findOne({ slug: req.params.todo })
    .then(todos => {
      res.json(todos);
    })
    .catch(e => {
      console.log(e);
      res.status(404).json("there's something problem");
    });
});

router.patch("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).json("seems not a valid id");
  }
  Todo.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        subtitle: req.body.subtitle,
        slug: slugify(req.body.title)
      }
    },
    { new: true }
  )
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(e => {
      console.log(e);
      res.status(404).json("there's something problem");
    });
});
router.delete("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).json("seems id is invalid");
  }
  Todo.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json("Todo deleted");
    })
    .catch(e => {
      console.log(e);
      res.status(404).json("there's something problem");
    });
});

module.exports = router;
