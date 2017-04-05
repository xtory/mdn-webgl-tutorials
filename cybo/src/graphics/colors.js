// Reference:
// Photoshop CS2 Swatches.

import { Color  } from './color';
    
//
// Constructor.
//
function Colors() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
Colors.DEFAULT_BACKGROUND = new Color(32/255, 32/255, 32/255, 1);

//
// System.
//
Colors.BLACK              = new Color(0, 0, 0, 1);
Colors.WHITE              = new Color(1, 1, 1, 1);
Colors.TRANSPARENT        = new Color(1, 1, 1, 0);
Colors.SKY_BLUE           = new Color(135/255, 206/255, 235/255, 1);
Colors.CADET_BLUE         = new Color(95/255, 158/255, 160/255, 1);

//
// Photoshop
//
// Red.
// (PS, There's no PHOTOSHOP_PASTEL_RED (cuz it's ugly), use PINK instead.)
//
Colors.PINK = new Color(255/255, 192/255, 203/255, 1);
Colors.PHOTOSHOP_DARK_RED = new Color(157/255, 10/255, 14/255, 1);

//
// Red orange.
//
Colors.PHOTOSHOP_PASTEL_RED_ORANGE = new Color(255, 173/255, 129/255, 1);
Colors.PHOTOSHOP_DARK_RED_ORANGE = new Color(255, 65/255, 13/255, 1);

//
// Yellow orange.
//
Colors.PHOTOSHOP_PASTEL_YELLOW_ORANGE = new Color(253/255, 198/255, 137/255, 1);
Colors.PHOTOSHOP_DARK_YELLOW_ORANGE = new Color(163/255, 97/255, 9/255, 1);

//
// Yellow.
//
Colors.PHOTOSHOP_PASTEL_YELLOW = new Color(255/255, 247/255, 153/255, 1);
Colors.PHOTOSHOP_DARK_YELLOW = new Color(171/255, 160/255, 0/255, 1);

//
// Green.
//
Colors.PHOTOSHOP_PASTEL_PEA_GREEN = new Color(196/255, 223/255, 155/255, 1);
Colors.PHOTOSHOP_DARK_PEA_GREEN = new Color(89/255, 133/255, 39/255, 1);

//
// Yellow green.
//
Colors.PHOTOSHOP_PASTEL_YELLOW_GREEN = new Color(162/255, 211/255, 156/255, 1);
Colors.PHOTOSHOP_DARK_YELLOW_GREEN = new Color(25/255, 122/255, 48/255, 1);

//
// Green.
//
Colors.PHOTOSHOP_PASTEL_GREEN = new Color(130/255, 202/255, 156/255, 1);
Colors.PHOTOSHOP_DARK_GREEN = new Color(0/255, 114/255, 54/255, 1);

//
// Green cyan.
//
Colors.PHOTOSHOP_PASTEL_GREEN_CYAN = new Color(122/255, 204/255, 200/255, 1);
Colors.PHOTOSHOP_DARK_GREEN_CYAN = new Color(0/255, 115/255, 106/255, 1);

//
// Cyan.
//
Colors.PHOTOSHOP_PASTEL_CYAN = new Color(109/255, 207/255, 246/255, 1);
Colors.PHOTOSHOP_DARK_CYAN = new Color(0/255, 118/255, 163/255, 1);

//
// Cyan blue.
//
Colors.PHOTOSHOP_PASTEL_CYAN_BLUE = new Color(125/255, 167/255, 216/255, 1);
Colors.PHOTOSHOP_DARK_CYAN_BLUE = new Color(0/255, 74/255, 128/255, 1);

//
// Blue.
//
Colors.PHOTOSHOP_PASTEL_BLUE = new Color(131/255, 147/255, 202/255, 1);
Colors.PHOTOSHOP_DARK_BLUE = new Color(0/255, 52/255, 113/255, 1);

//
// Blue violet.
//
Colors.PHOTOSHOP_PASTEL_BLUE_VIOLET = new Color(135/255, 129/255, 189/255, 1);
Colors.PHOTOSHOP_DARK_BLUE_VIOLET = new Color(27/255, 20/255, 100/255, 1);

//
// Violet.
//
Colors.PHOTOSHOP_PASTEL_VIOLET = new Color(161/255, 134/255, 190/255, 1);
Colors.PHOTOSHOP_DARK_VIOLET = new Color(68/255, 14/255, 98/255, 1);

//
// Violet magenta.
//
Colors.PHOTOSHOP_PASTEL_VIOLET_MAGENTA = new Color(188/255, 140/255, 191/255, 1);
Colors.PHOTOSHOP_DARK_VIOLET_MAGENTA = new Color(98/255, 4/255, 96/255, 1);

//
// Magenta.
//
Colors.PHOTOSHOP_PASTEL_MAGENTA = new Color(244/255, 154/255, 193/255, 1);
Colors.PHOTOSHOP_DARK_MAGENTA = new Color(158/255, 0/255, 93/255, 1);

//
// Magenta red.
//
Colors.PHOTOSHOP_PASTEL_MAGENTA_RED = new Color(245/255, 152/255, 157/255, 1);
Colors.PHOTOSHOP_DARK_MAGENTA_RED = new Color(157/255, 0/255, 57/255, 1);

//
// Brown.
//
Colors.PHOTOSHOP_PALE_COOL_BROWN = new Color(199/255, 178/255, 153/255, 1);
Colors.PHOTOSHOP_DARK_COOL_BROWN = new Color(83/255, 71/255, 65/255, 1);
Colors.PHOTOSHOP_PALE_WARM_BROWN = new Color(198/255, 156/255, 109/255, 1);
Colors.PHOTOSHOP_DARK_WARM_BROWN = new Color(117/255, 76/255, 36/255, 1);

//
// OSX
//
Colors.OSX_SOLID_KELP = new Color(89/255, 136/255, 123/255, 1);

Object.freeze(Colors);

export { Colors };
