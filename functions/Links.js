const axios = require('axios');

const addCalls = async (
  user_id,
  time,
  duration,
  friend_phone,
  rawtype,
  call_type,
  friend_id,
) => {
  try {
    axios.post('http://127.0.0.1:8921/calls', {
      user_id,
      time,
      duration,
      friend_phone,
      rawtype,
      call_type,
      friend_id,
    });
  } catch (e) {
    console.log(e);
  }
};

export {addCalls};
