import React, { useState } from 'react';
import Detail from '../../detail/Detail';
import { useModal } from '../../common/overlay/modal/Modal.hooks';
import { Tables } from '../../../types/supabase';

type PreviewProps = {
  data: Tables<'posts'>;
};

const Preview: React.FC<PreviewProps> = ({ data }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { mount, unmount } = useModal();

  const showDetail = () => {
    console.log('클릭');
    mount('detail', <Detail data={data} />);
    setIsModalOpened(true);
  };
  return <div onClick={showDetail}>{/* <img src={data.images} alt="Preview" /> */}</div>;
};

export default Preview;
