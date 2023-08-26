import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMapLocationStore } from '../../zustand/store';

interface SearchResult {
  boundingbox: string[];
  class: string;
  display_name: string;
  icon: string;
  importance: number;
  lat: number;
  lon: number;
  osm_id: string;
  osm_type: string;
  place_id: string;
  type: string;
}

const SearchBox = () => {
  const SEARCHURL = `https://us1.locationiq.com/v1/search.php?format=json&`;
  const Token = 'pk.8a7b3dab828f3f4cc07447c577ee59a2';
  const [value, setValue] = useState('');
  const [searchData, setSearchData] = useState<SearchResult[] | undefined>();
  const mapLocation = useMapLocationStore(state => state.mapLocation);

  const doSearch = async (e: any) => {
    e.preventDefault();
    if (!value) return false;
    let url = `${SEARCHURL}key=${Token}&q=${value}`;
    const response = await axios.get(url);
    const { data } = response;
    setSearchData(data.slice(0, 1));
  };

  useEffect(() => {
    if (searchData) {
      console.log(searchData);
      const coordinates: [number, number] = [searchData[0].lon, searchData[0].lat];
      mapLocation.flyTo({ center: [coordinates], zoom: 10 });
    }
  }, [searchData]);
  return (
    <form onSubmit={doSearch}>
      <input value={value} onChange={e => setValue(e.target.value)} />
    </form>
  );
};

export default SearchBox;
