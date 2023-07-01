import { useState, useEffect } from 'react';

const useFetchUserBasicInfo = (apiKey) => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!apiKey) return;

      const responseUserName = await fetch(`https://api.torn.com/user/?selections=basic&comment=TornAPI&key=${apiKey}`);
      const dataUserName = await responseUserName.json();
      
      // Check for error in the API response and throw it as a string
      if (dataUserName.error) {
        throw new Error(JSON.stringify(dataUserName.error));
      }
  
      setUserName(dataUserName.name);
    };
    
    fetchData();
  }, [apiKey]);
  
  

  return userName;
};

export default useFetchUserBasicInfo;
