import React from 'react';

import { BsFillImageFill } from 'react-icons/bs';
import { TbCameraRotate } from 'react-icons/tb';

import * as St from './style';
import Loader from '../../common/loader/Loader';

interface ImageUploadProps {
  imgFile: string | null;
  loading: boolean;
  handleImageSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imgRef: React.RefObject<HTMLInputElement>;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const ImageUpload = ({ imgFile, loading, handleImageSubmit, imgRef, handleDrop }: ImageUploadProps) => {
  return (
    <St.UploadBox onDragEnter={(event: any) => event.preventDefault()} onDragOver={(event: any) => event.preventDefault()} onDragLeave={(event: any) => event.preventDefault()} onDrop={handleDrop}>
      {imgFile ? (
        <St.UploadImgFileContainer>
          <label htmlFor="inputImg">
            <TbCameraRotate size={'22px'} className="image" />
          </label>
          <St.UploadImgFile src={imgFile} alt="이미지 업로드" />
          <span>1/1</span>
        </St.UploadImgFileContainer>
      ) : (
        <label htmlFor="inputImg">
          <>
            {loading ? (
              <St.MobileLoadingDiv>
                <St.MobileLoadingParagraph>사진 업로드 중 ···</St.MobileLoadingParagraph>
                <St.MobileImgBox>
                  <Loader />
                  <St.LoadingParagraph>
                    사진 업로드 중 ···
                    <br />
                    잠시만 기다려주세요!
                  </St.LoadingParagraph>
                </St.MobileImgBox>
              </St.MobileLoadingDiv>
            ) : (
              <St.ImgBox>
                <span>0/1</span>
                <BsFillImageFill size={'25px'} className="image" />
                <p>
                  여기에 사진을
                  <br />
                  업로드 해주세요
                </p>
              </St.ImgBox>
            )}
          </>
        </label>
      )}
      <input id="inputImg" type="file" multiple accept="image/png, image/jpeg, image/jpg, image/HEIC, image/heic " onChange={handleImageSubmit} ref={imgRef} />
    </St.UploadBox>
  );
};

export default ImageUpload;
