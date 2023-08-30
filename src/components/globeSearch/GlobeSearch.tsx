import { useEffect, useState } from 'react';
import { useMapLocationStore } from '../../zustand/store';
import { getSearchData } from '../../api/mapbox';
import { useQuery } from '@tanstack/react-query';
import SearchBox from './SearchBox';

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

  const { data: searchData, refetch } = useQuery<SearchResult[] | undefined>(['searchData'], () => getSearchData(value), {
    enabled: false,
  });

  const handleSearch = (value: string) => {
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
