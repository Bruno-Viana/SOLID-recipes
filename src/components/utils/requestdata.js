import React, { useState, useEffect } from 'react';

const RequestData = (searchTerm) => {
    const [data, setData] = useState([]);
    const client = axios.create({
        baseURL: "https://api.edamam.com/api/recipes/v2?type=public&q=+" + searchTerm + "&app_id=6bd1601d&app_key=49f019b3f5b8128868dce0126a6e100b" 
    });
    

   // GET with Axios
   useEffect(() => {
      const fetchData = async () => {
         let response = await client.get();
         setPosts(response.data);
         console.log("procurou dados")
      };
      fetchData();
   }, []);



   return (
      setData(response.data)
   );
};

export default RequestData;