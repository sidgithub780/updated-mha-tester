import axios from 'axios';

const addCalls = async (
  user_id,
  time,
  duration,
  friend_phone,
  rawtype,
  call_type,
  friend_id,
) => {
  axios.post('http://192.168.1.72:8921/calls', {
    user_id,
    time,
    duration,
    friend_phone,
    rawtype,
    call_type,
    friend_id,
  });
};

export {addCalls};
