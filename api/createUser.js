import axios from 'axios';

const CreateUser = async (req, res) => {
  const { userId, userName } = req.body;
  axios
    .post(
      'https://api.chatengine.io/users/',
      {
        username: userName,
        first_name: 'frank',
        last_name: 'idogho',
        secret: userId,
      },
      {
        headers: { 'Private-Key': process.env.chat_engine_key },
      },
    )
    .then(apiRes => {
      res.json({
        body: apiRes.body,
        error: null,
      });
    })
    .catch(() => {
      res.json({
        body: null,
        error: 'There was an error creating the user',
      });
    });
};

export default CreateUser;
