import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message:
      "Backend for Cabo Online Card Game",
    author: "Jordan Hayes",
    email: "hayesja99@gmail.com",
    github: "github.com/jhayes99823",
  });
});

export default router;
