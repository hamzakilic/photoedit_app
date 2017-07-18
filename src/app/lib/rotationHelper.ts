import { Point } from "./draw/point";
import { Calc } from "./calc";
import { SurfaceCanvas } from './surface';

/**
 * when a surface is rotated, this class helps  to calculate cursor
 * and also helps to calculate selection points movement 
 */
export class RotationHelper {
    /**
     * calculate cursor point for left and right selection points
     * with angles
     * @param  {any} instance
     * @param  {number} angle
     * @returns void
     */
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

    /**
     * calculates cursor at top and bottom selection point with angles
     * @param  {any} instance
     * @param  {number} angle
     * @returns void
     */
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
            instance.cursornwse = true;
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



    /**
     * calculates movement of left selection point result
     * @param  {MouseEvent} event
     * @param  {SurfaceCanvas} surface
     * @returns RotationMove
     */
    public static calculateRotationMoveLeft(event: MouseEvent, surface: SurfaceCanvas): RotationMove {
        let angle = surface.rotateAngleDeg;
        //center point of rectangle
        let centerPoint = new Point(surface.marginLeft + surface.width / 2, surface.marginTop + surface.height / 2);
        //find a base point
        //we will make this point a reference
        let rotatedRectBottom = Calc.rotatePoint(new Point(surface.marginLeft + surface.width, surface.marginTop + surface.height), surface.rotateAngleDeg, centerPoint);



        //mouse movement as point
        let m = new Point(event.movementX / surface.scale, 0);
        //for angles prepare positive or negative values
        if (angle <= 180)
            m = new Point(-event.movementX / surface.scale, 0);
        if (angle <= 140)
            m = new Point(-event.movementX / surface.scale, 0);

        if (angle <= 120)
            m = new Point(event.movementY / surface.scale, 0);

        if (angle <= 60)
            m = new Point(event.movementX / surface.scale, 0);

        if (angle <= -60)
            m = new Point(-event.movementY / surface.scale, 0);
        if (angle <= -140)
            m = new Point(-event.movementX / surface.scale, 0);


        //rotate mouse move point
        let rotatedmovePoint = Calc.rotatePoint(m, surface.rotateAngleDeg, new Point(0, 0));

        let nAngle = angle;


        //calculate new center point
        let nCenterPoint = new Point(centerPoint.X + rotatedmovePoint.X / 2, centerPoint.Y + rotatedmovePoint.Y / 2);

        //reverse rotate reference point
        //and do calculations
        let cal = Calc.rotatePoint(rotatedRectBottom, -nAngle, nCenterPoint);
        let newWidth = (cal.X - nCenterPoint.X) * 2;
        let newHeight = (cal.Y - nCenterPoint.Y) * 2;
        //if there is keepratio
        //calculate height difference
        if (surface.keepRatio) {
            let difwidth = newWidth - surface.width;
            let scale = surface.width / surface.height;
            let difheight = difwidth / scale;
            let po = new Point(0, difheight);
            let rotatedP = Calc.rotatePoint(po, surface.rotateAngleDeg, new Point(0, 0));
            //change center point again
            nCenterPoint.X -= rotatedP.X / 2;
            nCenterPoint.Y -= rotatedP.Y / 2;

        }

        //reverse again center point         
        cal = Calc.rotatePoint(rotatedRectBottom, -nAngle, nCenterPoint);
        //and calculate widht and height again
        newWidth = (cal.X - nCenterPoint.X) * 2;
        newHeight = (cal.Y - nCenterPoint.Y) * 2;

        //if width or height is so small then return immediatlye
        if (newWidth < 10 || newHeight < 10)
            return {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
                maskLeft: 0,
                maskTop: 0
            }


        //calculate left and top points
        let newLeft = cal.X - newWidth;
        let newtop = cal.Y - newHeight;

        return {
            width: newWidth - surface.width,
            height: newHeight - surface.height,
            left: newLeft - surface.marginLeft,
            top: newtop - surface.marginTop,
            maskLeft: newLeft - surface.marginLeft,
            maskTop: newtop - surface.marginTop
        };






    }


    /**
     * calculates movement of rotated selection right point result
     * @param  {MouseEvent} event
     * @param  {SurfaceCanvas} surface
     * @returns RotationMove
     */
    public static calculateRotationMoveRight(event: MouseEvent, surface: SurfaceCanvas): RotationMove {

        let angle = surface.rotateAngleDeg;
        //center point of surface
        let centerPoint = new Point(surface.marginLeft + surface.width / 2, surface.marginTop + surface.height / 2);
        //find a base  reference point
        let rotatedRectLeftTop = Calc.rotatePoint(new Point(surface.marginLeft, surface.marginTop), surface.rotateAngleDeg, centerPoint);


        //mouse mouve as point
        let m = new Point(event.movementX / surface.scale, 0);
        //calculate point positive or negative values for  angles 
        if (angle <= 180)
            m = new Point(-event.movementX / surface.scale, 0);
        if (angle <= 160)
            m = new Point(-event.movementX / surface.scale, 0);

        if (angle <= 120)
            m = new Point(event.movementY / surface.scale, 0);

        if (angle <= 60)
            m = new Point(event.movementX / surface.scale, 0);

        if (angle <= -60)
            m = new Point(-event.movementY / surface.scale, 0);
        if (angle <= -140)
            m = new Point(-event.movementX / surface.scale, 0);


        //rotate mouse move point
        let rotatedmovePoint = Calc.rotatePoint(m, surface.rotateAngleDeg, new Point(0, 0));

        let nAngle = angle;


        //with mouse recalculate center point again
        let nCenterPoint = new Point(centerPoint.X + rotatedmovePoint.X / 2, centerPoint.Y + rotatedmovePoint.Y / 2);

        //reverse rotate reference point around center
        let cal = Calc.rotatePoint(rotatedRectLeftTop, -nAngle, nCenterPoint);
        //calculate new width and height
        let newWidth = (nCenterPoint.X - cal.X) * 2;
        let newHeight = (nCenterPoint.Y - cal.Y) * 2;
        //if there is ratio, calculate height difference
        if (surface.keepRatio) {
            let difwidth = newWidth - surface.width;
            let scale = surface.width / surface.height;
            let difheight = difwidth / scale;
            let po = new Point(0, difheight);
            let rotatedP = Calc.rotatePoint(po, surface.rotateAngleDeg, new Point(0, 0));
            //changing  height also changes center recalculate again
            nCenterPoint.X += rotatedP.X / 2;
            nCenterPoint.Y += rotatedP.Y / 2;

        }

        //reverse rotate  reference point againg around  centerpoint
        cal = Calc.rotatePoint(rotatedRectLeftTop, -nAngle, nCenterPoint);
        newWidth = (nCenterPoint.X - cal.X) * 2;
        newHeight = (nCenterPoint.Y - cal.Y) * 2;

        //if width or height is so small then return immediatlye
        if (newWidth < 10 || newHeight < 10)
            return {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
                maskLeft: 0,
                maskTop: 0
            }


        let newLeft = cal.X;
        let newtop = cal.Y;

        return {
            width: newWidth - surface.width,
            height: newHeight - surface.height,
            left: newLeft - surface.marginLeft,
            top: newtop - surface.marginTop,
            maskLeft: newLeft - surface.marginLeft,
            maskTop: newtop - surface.marginTop
        };






    }



    /**
    * calculates movement of rotated selection top point result
    * @param  {MouseEvent} event
    * @param  {SurfaceCanvas} surface
    * @returns RotationMove
    */
    public static calculateRotationMoveTop(event: MouseEvent, surface: SurfaceCanvas): RotationMove {
        let angle = surface.rotateAngleDeg;

        //center point of surface
        let centerPoint = new Point(surface.marginLeft + surface.width / 2, surface.marginTop + surface.height / 2);
        //find a base reference point
        let rotatedRectLeftBottom = Calc.rotatePoint(new Point(surface.marginLeft, surface.marginTop + surface.height), surface.rotateAngleDeg, centerPoint);


        //mouse movement as point
        let m = new Point(0, event.movementY / surface.scale);
        //set positive or negative according to angle
        if (angle <= 180)
            m = new Point(0, -event.movementY / surface.scale);
        if (angle <= 140)
            m = new Point(0, -event.movementY / surface.scale);

        if (angle <= 120)
            m = new Point(0, -event.movementX / surface.scale);

        if (angle <= 60)
            m = new Point(0, event.movementY / surface.scale);

        if (angle <= -60)
            m = new Point(0, event.movementX / surface.scale);
        if (angle <= -140)
            m = new Point(0, -event.movementY / surface.scale);


        //rotate mouse movement
        let rotatedmovePoint = Calc.rotatePoint(m, surface.rotateAngleDeg, new Point(0, 0));

        let nAngle = angle;


        //recalculate center point again 
        let nCenterPoint = new Point(centerPoint.X + rotatedmovePoint.X / 2, centerPoint.Y + rotatedmovePoint.Y / 2);

        //reverse rotate reference point around centerpoint
        let cal = Calc.rotatePoint(rotatedRectLeftBottom, -nAngle, nCenterPoint);
        //recalculate new width and height
        let newWidth = (nCenterPoint.X - cal.X) * 2;
        let newHeight = (cal.Y - nCenterPoint.Y) * 2;

        //if there is keepratio then calculate difference of width according to height
        if (surface.keepRatio) {

            let scale = surface.width / surface.height;
            let difheight = newHeight - surface.height;
            let difwidth = difheight * scale;
            let po = new Point(difwidth, 0);
            let rotatedP = Calc.rotatePoint(po, surface.rotateAngleDeg, new Point(0, 0));
            //recalculate center point againg
            nCenterPoint.X += rotatedP.X / 2;
            nCenterPoint.Y += rotatedP.Y / 2;

        }

        //again reverse rotate reference point 
        cal = Calc.rotatePoint(rotatedRectLeftBottom, -nAngle, nCenterPoint);
        newWidth = (nCenterPoint.X - cal.X) * 2;
        newHeight = (cal.Y - nCenterPoint.Y) * 2;

        //if width or height is so small then return immediatlye
        if (newWidth < 10 || newHeight < 10)
            return {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
                maskLeft: 0,
                maskTop: 0
            }


        let newLeft = cal.X;
        let newtop = cal.Y - newHeight;

        return {
            width: newWidth - surface.width,
            height: newHeight - surface.height,
            left: newLeft - surface.marginLeft,
            top: newtop - surface.marginTop,
            maskLeft: newLeft - surface.marginLeft,
            maskTop: newtop - surface.marginTop
        };






    }


    /**
    * calculates movement of rotated selection top point result
    * @param  {MouseEvent} event
    * @param  {SurfaceCanvas} surface
    * @returns RotationMove
    */
    public static calculateRotationMoveBottom(event: MouseEvent, surface: SurfaceCanvas): RotationMove {
        let angle = surface.rotateAngleDeg;
        //center of surface
        let centerPoint = new Point(surface.marginLeft + surface.width / 2, surface.marginTop + surface.height / 2);
        //find a base reference point for calculation
        let rotatedRectRightTop = Calc.rotatePoint(new Point(surface.marginLeft + surface.width, surface.marginTop), surface.rotateAngleDeg, centerPoint);


        //mouse movement as a point
        let m = new Point(0, event.movementY / surface.scale);
        //calculate positive or negative of movement again
        if (angle <= 180)
            m = new Point(0, -event.movementY / surface.scale);
        if (angle <= 140)
            m = new Point(0, -event.movementY / surface.scale);

        if (angle <= 120)
            m = new Point(0, -event.movementX / surface.scale);

        if (angle <= 60)
            m = new Point(0, event.movementY / surface.scale);

        if (angle <= -60)
            m = new Point(0, event.movementX / surface.scale);
        if (angle <= -140)
            m = new Point(0, -event.movementY / surface.scale);


        //rotate mouse movement 
        let rotatedmovePoint = Calc.rotatePoint(m, surface.rotateAngleDeg, new Point(0, 0));

        let nAngle = angle;


        //calculate center point again
        let nCenterPoint = new Point(centerPoint.X + rotatedmovePoint.X / 2, centerPoint.Y + rotatedmovePoint.Y / 2);

        //reverse rotate reference point again 
        let cal = Calc.rotatePoint(rotatedRectRightTop, -nAngle, nCenterPoint);

        let newWidth = (cal.X - nCenterPoint.X) * 2;
        let newHeight = (nCenterPoint.Y - cal.Y) * 2;

        if (surface.keepRatio) {
            //calculate difference width again
            let scale = surface.width / surface.height;
            let difheight = newHeight - surface.height;
            let difwidth = difheight * scale;
            let po = new Point(difwidth, 0);
            let rotatedP = Calc.rotatePoint(po, surface.rotateAngleDeg, new Point(0, 0));
            //recalculate center point 
            nCenterPoint.X -= rotatedP.X / 2;
            nCenterPoint.Y -= rotatedP.Y / 2;

        }
        //reverse rotate reference point 
        cal = Calc.rotatePoint(rotatedRectRightTop, -nAngle, nCenterPoint);
        newWidth = (cal.X - nCenterPoint.X) * 2;
        newHeight = (nCenterPoint.Y - cal.Y) * 2;


        //if width or height is so small then return immediatlye
        if (newWidth < 10 || newHeight < 10)
            return {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
                maskLeft: 0,
                maskTop: 0
            }


        let newLeft = cal.X - newWidth;
        let newtop = cal.Y;

        return {
            width: newWidth - surface.width,
            height: newHeight - surface.height,
            left: newLeft - surface.marginLeft,
            top: newtop - surface.marginTop,
            maskLeft: newLeft - surface.marginLeft,
            maskTop: newtop - surface.marginTop
        };






    }
}

/**
 * interface for rotation movement of left,right,top,bottom point
 */
export interface RotationMove {
    width: number;
    height: number;
    left: number;
    top: number;
    maskLeft: number;
    maskTop: number;

}