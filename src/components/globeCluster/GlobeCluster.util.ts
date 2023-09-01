import clusterFive from '../../assets/pin/clusterFive.png';
import clusterTen from '../../assets/pin/clusterTen.png';
import clusterTwenty from '../../assets/pin/clusterTwenty.png';
import unclusterPin from '../../assets/pin/unclusterPin.png';

export const pinImages = [
  { name: 'unclusterPin', url: unclusterPin },
  { name: 'clusterFive', url: clusterFive },
  { name: 'clusterTen', url: clusterTen },
  { name: 'clusterTwenty', url: clusterTwenty },
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
