import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import SearchBox from './GlobeSearch.SearchBox';
import { getSearchData } from '../../api/mapbox';
import { useMapLocationStore } from '../../zustand/useMapLocationStore';

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

const GlobeSearch = () => {
  const [value, setValue] = useState<string>('');
  const mapLocation = useMapLocationStore(state => state.mapLocation);

  const { data: searchData, refetch } = useQuery<SearchResult[] | undefined>(['searchData'], async () => await getSearchData(value), {
    enabled: false,
  });

  const handleSearch = (_value: string) => {
    refetch();
  };

  useEffect(() => {
    if (searchData && searchData.length > 0) {
      const coordinates: [number, number] = [searchData[0].lon, searchData[0].lat];
      mapLocation.flyTo({ center: coordinates, zoom: 7 });
    }
  }, [searchData, mapLocation]);

  return <SearchBox onSearch={handleSearch} value={value} setValue={setValue} />;
};

export default GlobeSearch;
