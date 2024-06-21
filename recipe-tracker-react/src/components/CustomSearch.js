import React, { useState, useEffect } from 'react';

const CustomSearch = () => {
  const cx = "87a79793f07984bb1"
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const apiKey="AIzaSyAUUXWKF7J3lEkfJcUgIon2We3ORZfEcZg"
  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) return;
      setLoading(true);
      setErrorMessage(null);

      try {
        const encodedTerm = encodeURIComponent(searchTerm);
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodedTerm}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error fetching search results: ${response.statusText}`);
        }

        const data = await response.json();
        setSearchResults(data.items || []);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderSearchResults = () => {
    if (loading) return <p>Loading...</p>;
    if (errorMessage) return <p className="error">{errorMessage}</p>;
    if (!searchResults.length) return <p>No results found.</p>;

    return (
      <ul>
        {searchResults.map((result) => (
          <li key={result.link}>
            <a href={result.link} target="_blank" rel="noreferrer">
              {result.title}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
      {renderSearchResults()}
    </div>
  );
};

export default CustomSearch;
