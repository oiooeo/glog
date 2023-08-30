import mediumPin from '../../assets/pin/mideumPin.png';
import smallPin from '../../assets/pin/smallPin.png';
import LargePin from '../../assets/pin/LargePin.png';

export const pinImages = [
  { name: 'LargePin', url: LargePin },
  { name: 'mediumPin', url: mediumPin },
  { name: 'smallPin', url: smallPin },
];

export const loadPinImage = (mapLocation: any, imageName: string, imageUrl: string) => {
  mapLocation?.loadImage(imageUrl, (error: Error | undefined, image: any) => {
    if (error) throw error;
    if (!mapLocation?.hasImage(imageName)) {
      mapLocation?.addImage(imageName, image);
    }
  });
};

export const removeMapLayersAndSource = (map: any) => {
  map.removeLayer('unclustered-point');
  map.removeLayer('cluster-pin');
  map.removeSource('pinPoint');
};
