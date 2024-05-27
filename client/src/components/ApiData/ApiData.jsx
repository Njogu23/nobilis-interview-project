import React, { useContext, useState } from 'react';
import { MyContext } from '../../MyContext';
import "./apiData.css"

const ApiData = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { data, loading, error, fetchData } = useContext(MyContext);

  const handleClick = () => {
    setIsFetching(!isFetching);
    fetchData();
  };

  function handleDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className='container'>
      <h1>Cat Facts Table</h1>
      <button className='btn-api' onClick={handleClick}>
        {isFetching ? 'Hide data' : 'Fetch data...'}
      </button>

      {isFetching ? (
        <>
        <>{loading && <p>Loading...</p>}</>
        <>{data && (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Fact</th>
                <th>Verified</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item._id}>
                  <td>{item.text}</td>
                  <td>{item.status.verified ? 'True' : 'False'}</td>
                  <td>{handleDate(new Date(item.createdAt))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}</></>) : (
          <>{error && <p>Error: {error}</p>}</>
      )}
    </div>
  );
};

export default ApiData;
