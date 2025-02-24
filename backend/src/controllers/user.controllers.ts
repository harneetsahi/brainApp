function signup(req, res) {
  res.status(200).json({ message: "Signed up" });
}

function login(req, res) {
  res.status(200).json({
    message: "Signed up",
  });
}

function postContent(req, res) {
  res.status(200).json({
    message: "Posted content",
  });
}

function getContent(req, res) {
  res.status(200).json({
    message: "Fetched content",
  });
}

function deleteContent(req, res) {
  res.status(200).json({
    message: "deleted content",
  });
}
function shareContent(req, res) {
  res.status(200).json({
    message: "share link",
  });
}
function getSharedContent(req, res) {
  res.status(200).json({
    message: "fetched shared link",
  });
}

export {
  signup,
  login,
  postContent,
  getContent,
  deleteContent,
  shareContent,
  getSharedContent,
};
