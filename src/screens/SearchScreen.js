import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';

const styles = StyleSheet.create({
  errorStyle: {
    color: '#fa0e0e',
  },
});

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const searchApi = async () => {
    try {
      const response = await yelp.get('/search', {
        params: {
          term,
          limit: 50,
          location: 'san jose',
        },
      });
      setResults(response.data.businesses);
      setError('');
    } catch (err) {
      console.log(err.response.data);
      setError('Something went wrong.');
    }
  };

  return (
    <View>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={searchApi} />
      {error ? <Text style={styles.errorStyle}>{error}</Text> : null}
      <Text>We have found {results.length} results.</Text>
    </View>
  );
};

export default SearchScreen;
