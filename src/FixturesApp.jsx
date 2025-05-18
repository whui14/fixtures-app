import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import SearchInput from './components/SearchInput';
import FixturesList from './components/FixturesList';
import FixtureDetails from './components/FixtureDetails';

export default function FixturesApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFixture, setSelectedFixture] = useState(null);

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Segoe UI', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Fixtures Data Import & Search</h1>

      {/* File Upload Section */}
      <FileUpload />

      {/* Search Section */}
      <section style={{ marginTop: 40 }}>
        <h2>Search Fixtures</h2>
        <SearchInput
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onResultsChange={setSearchResults}
          onSelectFixture={setSelectedFixture}
          clearSelected={() => setSelectedFixture(null)}
        />
        <FixturesList
          fixtures={searchResults}
          onSelect={setSelectedFixture}
        />
        {selectedFixture && (
          <FixtureDetails
            fixture={selectedFixture}
            onClose={() => setSelectedFixture(null)}
          />
        )}
      </section>
    </div>
  );
}
