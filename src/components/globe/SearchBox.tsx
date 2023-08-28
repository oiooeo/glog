import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMapLocationStore } from '../../zustand/store';
import { getSearchData } from '../../api/mapbox';
import { useQuery } from '@tanstack/react-query';

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
  const [value, setValue] = useState('');
  const mapLocation = useMapLocationStore(state => state.mapLocation);

  const { data: searchData, refetch } = useQuery<SearchResult[] | undefined>(
    ['searchData', value], // QueryKey로 ['searchData', value]를 사용
    () => getSearchData(value), // 데이터를 가져오는 비동기 함수
    {
      enabled: false, // 최초에는 refetch를 비활성화
    },
  );
  const doSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (searchData && searchData.length > 0) {
      console.log(searchData);
      const coordinates: [number, number] = [searchData[0].lon, searchData[0].lat];
      mapLocation.flyTo({ center: coordinates, zoom: 7 });
    }
  }, [searchData, mapLocation]);
  return (
    <form onSubmit={doSearch}>
      <input value={value} onChange={e => setValue(e.target.value)} />
    </form>
  );
};

export default SearchBox;
