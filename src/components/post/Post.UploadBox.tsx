import React from 'react';

import { BsFillImageFill } from 'react-icons/bs';
import { TbCameraRotate } from 'react-icons/tb';

import * as Styled from './style';
import Loader from '../common/loader/Loader';

interface UploadBoxTypes {
  imgFile: string | null;
  loading: boolean;
  handleImageSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imgRef: React.RefObject<HTMLInputElement>;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const useImageUpload = ({ imgFile, loading, handleImageSubmit, imgRef, handleDrop }: UploadBoxTypes) => {
  return (
    <Styled.UploadBox onDragEnter={(event: any) => event.preventDefault()} onDragOver={(event: any) => event.preventDefault()} onDragLeave={(event: any) => event.preventDefault()} onDrop={handleDrop}>
      {imgFile ? (
        <Styled.UploadImgFileContainer>
          <label htmlFor="inputImg">
            <TbCameraRotate size={'22px'} className="image" />
          </label>
          <Styled.UploadImgFile src={imgFile} alt="이미지 업로드" />
          <span>1/1</span>
        </Styled.UploadImgFileContainer>
      ) : (
        <label htmlFor="inputImg">
          <>
            {loading ? (
              <Styled.LoadingDivMobile>
                <Styled.LoadingParagraphMobile>사진 업로드 중 ···</Styled.LoadingParagraphMobile>
                <Styled.ImgBoxMobile>
                  <Loader />
                  <Styled.LoadingParagraph>
                    사진 업로드 중 ···
                    <br />
                    잠시만 기다려주세요!
                  </Styled.LoadingParagraph>
                </Styled.ImgBoxMobile>
              </Styled.LoadingDivMobile>
            ) : (
              <Styled.ImgBox>
                <span>0/1</span>
                <BsFillImageFill size={'25px'} className="image" />
                <p>
                  여기에 사진을
                  <br />
                  업로드 해주세요
                </p>
              </Styled.ImgBox>
            )}
          </>
        </label>
      )}
      <input id="inputImg" type="file" multiple accept="image/png, image/jpeg, image/jpg, image/HEIC, image/heic " onChange={handleImageSubmit} ref={imgRef} />
    </Styled.UploadBox>
  );
};

export default useImageUpload;
