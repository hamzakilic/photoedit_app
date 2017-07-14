import { Point } from "./draw/point";
import { Calc } from "./calc";
import { SurfaceCanvas } from './surface';


export class RotationHelper {

    public static calculateCursorLeftRight(instance: any, angle: number): void {

        if (angle >= -180 && angle <= -160) {
            instance.cursorew = true;
        }
        if (angle > -160 && angle <= -100) {
            instance.cursornwse = true;
        }
        if (angle > -100 && angle <= -60) {
            instance.cursorns = true;
        }
        if (angle > -60 && angle <= -30) {
            instance.cursornesw = true;
        }
        if (angle > -30 && angle <= 30) {
            instance.cursorew = true;
        }
        if (angle > 30 && angle <= 60) {
            instance.cursornwse = true;
        }
        if (angle > 60 && angle <= 100) {
            instance.cursorns = true;
        }
        if (angle > 100 && angle <= 160) {
            instance.cursornesw = true;
        }
        if (angle > 160 && angle <= 180) {
            instance.cursorew = true;
        }
    }


    public static calculateCursorTopBottom(instance: any, angle: number): void {



        if (angle >= -180 && angle <= -160) {
            instance.cursorns = true;
        }
        if (angle > -160 && angle <= -100) {
            instance.cursornesw = true;
        }
        if (angle > -100 && angle <= -60) {
            instance.cursorew = true;
        }
        if (angle > -60 && angle <= -30) {
            instance.cursornesw = true;
        }
        if (angle > -30 && angle <= 30) {
            instance.cursorns = true;
        }
        if (angle > 30 && angle <= 60) {
            instance.cursornesw = true;
        }
        if (angle > 60 && angle <= 100) {
            instance.cursorew = true;
        }
        if (angle > 100 && angle <= 160) {
            instance.cursornwse = true;
        }
        if (angle > 160 && angle <= 180) {
            instance.cursorns = true;
        }
    }



    public static calculateRotationMoveLeft(event: MouseEvent, surface: SurfaceCanvas): RotationMove {
        let angle = surface.rotateAngleDeg;
        let centerPoint = new Point(surface.marginLeft + surface.width / 2, surface.marginTop + surface.height / 2);

        let rotatedRectBottom = Calc.rotatePoint(new Point(surface.marginLeft + surface.width, surface.marginTop + surface.height), surface.rotateAngleDeg, centerPoint);

       // if (angle >= -90 && angle <= 0)
         {

            let m = new Point(event.movementX / surface.scale, 0);
            if (angle <= -60)
                m = new Point(-event.movementY / surface.scale, 0);
            let rotatedmovePoint = Calc.rotatePoint(m, surface.rotateAngleDeg, new Point(0, 0));

            let nAngle = angle;



            let nCenterPoint = new Point(centerPoint.X + rotatedmovePoint.X / 2, centerPoint.Y + rotatedmovePoint.Y / 2);


            let cal = Calc.rotatePoint(rotatedRectBottom, -nAngle, nCenterPoint);
            let newWidth = (cal.X - nCenterPoint.X) * 2;
            let newHeight = (cal.Y - nCenterPoint.Y) * 2;
            if (surface.keepRatio) {
                let difwidth = newWidth - surface.width;
                let scale = surface.width / surface.height;
                let difheight = difwidth / scale;
                let po = new Point(0, difheight);
                let rotatedP = Calc.rotatePoint(po, surface.rotateAngleDeg, new Point(0, 0));
                nCenterPoint.X -= rotatedP.X / 2;
                nCenterPoint.Y -= rotatedP.Y / 2;

            }

            cal = Calc.rotatePoint(rotatedRectBottom, -nAngle, nCenterPoint);
            newWidth = (cal.X - nCenterPoint.X) * 2;
            newHeight = (cal.Y - nCenterPoint.Y) * 2;
            let newLeft = cal.X - newWidth;
            let newtop = cal.Y - newHeight;
            //surface.width =newWidth;
            //surface.height =newHeight;
            //surface.marginLeft=cal.X-surface.width;
            //surface.marginTop=cal.Y-surface.height;    
            return {
                width: newWidth - surface.width,
                height: newHeight - surface.height,
                left: newLeft - surface.marginLeft,
                top: newtop - surface.marginTop,
                maskLeft: newLeft - surface.marginLeft,
                maskTop: newtop - surface.marginTop
            };



        }

       // return { width: event.movementX, height: 0, left: 0, top: 0, maskLeft: 0, maskTop: 0 };
    }
}


export interface RotationMove {
    width: number;
    height: number;
    left: number;
    top: number;
    maskLeft: number;
    maskTop: number;

}