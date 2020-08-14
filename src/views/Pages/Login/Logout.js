import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';

const Farm = () => {
  const history = useHistory()

  useEffect(() => {
    localStorage.removeItem('token');
    history.push('/login');
  }, [])

  return 'logout';
};

export default Farm;