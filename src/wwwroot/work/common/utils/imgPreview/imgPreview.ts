import { imgPreview } from '@stl/image-preview'

interface imgMagnificationModel {
  parentEle: any;
  key?: string;
  prevBgImg?: string;
  nextBgImg?: string;
  closeBgImg?: string;
  bigBgImg?: string;
  smallBgImg?: string;
  titleUpImg?: string;
  IsBox?: boolean;
  isPaging?: boolean;
  titleUp?: boolean;
  titlePosition?: number;
  videoWdith?: number;
  clickCallback?: (dom: any, ev: any) => boolean;
  showBox?: string;
}

/**
 * 放大图片重写
 * @param options 
 */
export default function imgPreviews(options: imgMagnificationModel) {
    let data: any = Object.assign( {
        prevBgImg: '/assets/images/imgPreview/20181009152904076.png',
        nextBgImg: '/assets/images/imgPreview/20181009152928779.png',
        closeBgImg: '/assets/images/imgPreview/20191112190957661.png',
        bigBgImg: '/assets/images/imgPreview/20191112192601224.png',
        smallBgImg: '/assets/images/imgPreview/20191112192603317.png',
    }, options)
    imgPreview(data)
}