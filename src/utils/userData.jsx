import { useEffect } from 'react';
import userData from '@apis/userData';
import Cookies from 'universal-cookie';

export const UserData = () => {
  const cookies = new Cookies();
  const sessionId = cookies.get('session_id') ? cookies.get('session_id') : null;

  useEffect(() => {
    const fetchData = async () => {
      const result = await userData();

      if (!sessionId) {
        cookies.set('session_id', result.sessionId, {
          path: '/',
          sameSite: 'strict',
          maxAge: 365 * 24 * 60 * 60,
          expires: new Date(Date.now() + 356 * 24 * 60 * 60 * 1000)
        });
      }
    };

    fetchData();
  }, []);
};

export default UserData;
