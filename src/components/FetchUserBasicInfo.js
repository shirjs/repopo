// FetchUserBasicInfo.js
import { useState, useEffect } from 'react';

const FetchUserBasicInfo = (apiKey) => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const responseUserName = await fetch(`https://api.torn.com/user/?selections=basic&comment=TornAPI&key=${apiKey}`);
      const dataUserName = await responseUserName.json();
      setUserName(dataUserName.name);
    }
    fetchData();
  }, [apiKey]);

  return userName;
};

export default FetchUserBasicInfo;
