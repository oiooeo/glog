import React, { useEffect, useState } from 'react';
import { AuthError, googleLogin } from '../api/supabaseAuth';
import { supabase } from '../api/supabaseClient';
import Switch from '../components/common/switch/Switch';

const Home = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if (value.data.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  const googleLoginHandler = () => {
    try {
      googleLogin();
    } catch (error) {
      if (error instanceof AuthError) {
        alert({ type: 'alert', title: '로그인 실패', content: error.message });
      }
    }
  };

  const [switch1Checked, setSwitch1Checked] = useState(false);

  return (
    <div>
      Home
      <button onClick={googleLoginHandler}>로그인</button>
      <Switch checked={switch1Checked} onChange={setSwitch1Checked} left={'탐색'} right={'MY'} />
    </div>
  );
};

export default Home;
