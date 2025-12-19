/**
 * w = Width
 * h = Height
 * x = xPos
 * y = yPos
 * rx = Corner Radius X
 * ry = Corner Radius Y
 */
type Rectangle = {
  w: number;
  h: number;
  x: number;
  y: number;
  rx: number;
  ry: number;
}

/**
 * r = Radius
 * cx = Center X
 * cy = Center Y
 */
type Circle = {
  r: number;
  cx: number;
  cy: number;
}

/**
 * rx = Corner Radius X
 * ry = Corner Radius Y
 * cx = Center X
 * cy = Center Y
 */
type Ellipse = {
  rx: number;
  ry: number;
  cx: number;
  cy: number;
}

/**
 * x1 = X Start
 * y2 = Y Start
 * x2 = X End
 * y2 = Y End
 */
type Line = {
  x1: number;
  y1: number;
  x2: number;
  x2: number;
}

/**
 * points = List of X,Y coordinates
 * ie: [22,33, 55,66, 88,99]
 *     [ x,y    x,y    x,y ]
 */    
type Polyline = {
  points: [];
}

/**
 * points = List of X,Y coordinates
 * ie: [22,33, 55,66, 88,99]
 *     [ x,y    x,y    x,y ]
 */
type Polygon = {
  points: [];
}







/**
 * Move to
 * xPos
 * yPos
 */
type M = {
  x: number;
  y: number;
};

/**
 * Line to
 * xPos
 * yPos
 */
type L = {
  x: number;
  y: number;
};

/**
 * Horizontal Line to
 * xPos End
 */
type H = {
  x: number;
};

/**
 * Vertical Line to
 * xPos End
 */
type V = {
  y: number;
};

/**
 * Bézier Curves
 * xPos Start Control Point
 * yPos Start Control Point
 * xPos End Control Point
 * yPos End Control Point
 * xPos Line End
 * yPos Line End
 */
type C = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x: number;
  y: number;
};

/**
 * Chained Bézier Curves
 * xPos End Control Point
 * yPos End Control Point
 * xPos Line End
 * yPos Line End
 */
type S = {
  x2: number;
  y2: number;
  x: number;
  y: number;
};

/**
 * Quadratic Curve
 * xPos Control Point
 * yPos Control Point
 */
type Q = {
  x1: number;
  y1: number;
  x: number;
  y: number;
};

/**
 * Cubic Bézier Curve
 * xPos Line End
 * yPos Line End
 * ! Can only be chained after a Q or T Command
 */
type T = {
  x: number;
  y: number;
};

/**
 * Arcs
 * xRadius
 * yRadius
 * xAxisRotation
 * largeArcFlag (0 / 1)
 * sweepFlag (0 / 1)
 * xPos Ellipse Center
 * yPos Ellipse Center
 */
type A = {
  rx: number;
  ry: number;
  xAxisRotation: number;
  largeArcFlag: number;
  sweepFlag: number;
  x: number;
  y: number;
}

/**
 * Path Close
 */
type Z = {}

type PathAction =
  | { type: 'M'; d: M }
  | { type: 'L'; d: L }
  | { type: 'H'; d: H }
  | { type: 'V'; d: V }
  | { type: 'C'; d: C }
  | { type: 'S'; d: S }
  | { type: 'Q'; d: Q }
  | { type: 'T'; d: T }
  | { type: 'A'; d: A }
  | { type: 'Z'; d: Z };

/**
 * d = [aX Y]
 * ie: [M120 30, l320 160]
 */
type Path = {
  d: PathAction[]
}

// Example Path
const thisPath: Path = {
  d: [
    {
      type: "Q",
      d: {
        x1: 200,
        y1: 200,
        x: 200,
        y: 200,
      }
    },
    {
      type: "S",
      d: {
        x2: 200,
        y2: 200,
        x: 200,
        y: 200,
      }
    }
  ]
}