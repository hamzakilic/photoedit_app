export class ColorConversion{
    /**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
public static  rgbToHsl(r, g, b):Array<number> {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return [ h, s, l ];
  }
  
  /**
   * Converts an HSL color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes h, s, and l are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   *
   * @param   Number  h       The hue
   * @param   Number  s       The saturation
   * @param   Number  l       The lightness
   * @return  Array           The RGB representation
   */
  public static  hslToRgb(h, s, l) {
    var r, g, b;
  
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      
  
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
  
      r = this.hue2rgb(p, q, h + 1/3);
      g = this.hue2rgb(p, q, h);
      b = this.hue2rgb(p, q, h - 1/3);
    }
  
    return [ r * 255, g * 255, b * 255 ];
  }

 private static hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

  
  /**
   * Converts an RGB color value to HSV. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
   * Assumes r, g, and b are contained in the set [0, 255] and
   * returns h, s, and v in the set [0, 1].
   *
   * @param   Number  r       The red color value
   * @param   Number  g       The green color value
   * @param   Number  b       The blue color value
   * @return  Array           The HSV representation
   */
  public static rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;
  
    var d = max - min;
    s = max == 0 ? 0 : d / max;
  
    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return [ h, s, v ];
  }
  
  /**
   * Converts an HSV color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
   * Assumes h, s, and v are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   *
   * @param   Number  h       The hue
   * @param   Number  s       The saturation
   * @param   Number  v       The value
   * @return  Array           The RGB representation
   */
  public static  hsvToRgb(h, s, v) {
    var r, g, b;
  
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
  
    return [ r * 255, g * 255, b * 255 ];
  }

  public static rgbToXYZ(r,g,b){
    let _R = ( r / 255 )
    let _G = ( g / 255 )
    let _B = ( b / 255 )
    
    if ( _R > 0.04045 ) _R = ( ( _R + 0.055 ) / 1.055 ) ^ 2.4
    else                   _R = _R / 12.92
    if ( _G > 0.04045 ) _G = ( ( _G + 0.055 ) / 1.055 ) ^ 2.4
    else                   _G = _G / 12.92
    if ( _B > 0.04045 ) _B = ( ( _B + 0.055 ) / 1.055 ) ^ 2.4
    else                   _B = _B / 12.92
    
    _R = _R * 100
    _G = _G * 100
    _B = _B * 100
    
    let X = _R * 0.4124 + _G * 0.3576 + _B * 0.1805
    let Y = _R * 0.2126 + _G * 0.7152 + _B * 0.0722
    let Z = _R * 0.0193 + _G * 0.1192 + _B * 0.9505
    return [X,Y,Z];
  }

  public static XYZToCIE_Lab(X,Y,Z){
    const ReferenceX=95.047;
    const ReferenceY=100.000;
    const ReferenceZ=	108.883;
    let _X = X / ReferenceX
    let _Y = Y / ReferenceY
    let _Z = Z / ReferenceZ
    
    if ( _X > 0.008856 ) _X = _X ^ ( 1/3 )
    else                    _X = ( 7.787 * _X ) + ( 16 / 116 )
    if ( _Y > 0.008856 ) _Y = _Y ^ ( 1/3 )
    else                    _Y = ( 7.787 * _Y ) + ( 16 / 116 )
    if ( _Z > 0.008856 ) _Z = _Z ^ ( 1/3 )
    else                    _Z = ( 7.787 * _Z ) + ( 16 / 116 )
    
    let CIEL = ( 116 * _Y ) - 16
    let CIEa = 500 * ( _X - _Y )
    let CIEb = 200 * ( _Y - _Z )
    return [CIEL,CIEa,CIEb];
  }
}