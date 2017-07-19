import {HImage} from '../image';
import { Rect } from '../draw/rect';
import { Calc } from '../calc';
export class Imaging {

    public static clone(img: HImage): HImage{
         let arr = new Uint8ClampedArray(img.width*img.height*4);
        arr.set(img.Pixels);
        return new HImage(img.width,img.height,arr);
    }
    public static fill(img:HImage, val: number,start?: number, end?: number){
        img.Pixels.fill(val,start,end);
    }

    public static crop(img:HImage,rect:Rect): HImage{
        let arr = new Uint8ClampedArray(rect.width*rect.height*4);
        let pos=0;
        for(let y=rect.y;y<rect.y+rect.height;++y){
            let start=y*img.width*4+rect.width*4;
            let end=start+rect.width*4;
            let row=img.Pixels.slice(start,end);
            arr.set(row,pos);
            pos+=row.byteLength;
        }
        return new HImage(rect.width,rect.height,arr);



    }
    public static crop2(img:HImage,rectSource:Rect, rectDestination:Rect,angleDegrees: number): HImage{
        if(angleDegrees==0){
            debugger;
             let rectIntersect=Calc.intersectRect(rectSource,rectDestination);
            if(!rectIntersect)
                return undefined;
            rectIntersect.x-=rectSource.x;
            rectIntersect.y-=rectSource.y;
            rectIntersect.x = rectIntersect.x.extRound();
            rectIntersect.y=rectIntersect.y.extRound();
            rectIntersect.width=rectIntersect.width.extRound();
            rectIntersect.height=rectIntersect.height.extRound();
            return Imaging.crop(img,rectIntersect);
        }
        return undefined;

    }
    
}