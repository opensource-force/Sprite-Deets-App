/**
 * Represents a 2-dimensional vector with x and y coordinates.
 */
export class Vector2 {
  /**
   * The x-coordinate of the vector.
   */
  private _x: number;

  /**
   * Gets the x-coordinate of the vector.
   */
  public get x(): number {
    return this._x;
  }

  /**
   * Sets the x-coordinate of the vector.
   */
  public set x(value: number) {
    this._x = value;
  }

  /**
   * The y-coordinate of the vector.
   */
  private _y: number;

  /**
   * Gets the y-coordinate of the vector.
   */
  public get y(): number {
    return this._y;
  }

  /**
   * Sets the y-coordinate of the vector.
   */
  public set y(value: number) {
    this._y = value;
  }

  /**
   * Creates an instance of a 2-dimensional vector.
   * @param x - The x-coordinate of the vector.
   * @param y - The y-coordinate of the vector.
   */
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
}

/**
 * Represents a point in a 2D space.
 */
export class Point {
  /**
   * The x-coordinate of the point.
   * @type {number}
   */
  private _x: number;

  /**
   * Gets the x-coordinate of the point.
   * @returns {number} The x-coordinate.
   */
  public get x(): number {
    return this._x;
  }

  /**
   * Sets the x-coordinate of the point.
   * @param {number} value - The new x-coordinate.
   */
  public set x(value: number) {
    this._x = value;
  }

  /**
   * The y-coordinate of the point.
   * @type {number}
   */
  private _y: number;

  /**
   * Gets the y-coordinate of the point.
   * @returns {number} The y-coordinate.
   */
  public get y(): number {
    return this._y;
  }

  /**
   * Sets the y-coordinate of the point.
   * @param {number} value - The new y-coordinate.
   */
  public set y(value: number) {
    this._y = value;
  }

  /**
   * Creates an instance of Point.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
}

/**
 * Represents the size of an object with width and height.
 */
export class Size {
  /**
   * The width of the object.
   * @type {number}
   */
  private _width: number;

  /**
   * Gets the width of the object.
   * @returns {number} The width of the object.
   */
  public get width(): number {
    return this._width;
  }

  /**
   * Sets the width of the object.
   * @param {number} value - The new width of the object.
   */
  public set width(value: number) {
    this._width = value;
  }

  /**
   * The height of the object.
   * @type {number}
   */
  private _height: number;

  /**
   * Gets the height of the object.
   * @returns {number} The height of the object.
   */
  public get height(): number {
    return this._height;
  }

  /**
   * Sets the height of the object.
   * @param {number} value - The new height of the object.
   */
  public set height(value: number) {
    this._height = value;
  }

  /**
   * Creates an instance of Size.
   * @param {number} width - The width of the object.
   * @param {number} height - The height of the object.
   */
  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }
}

/**
 * Represents a rectangle defined by an origin point and a size.
 */
export class Rectangle {
  /**
   * The origin point of the rectangle.
   */
  private _position: Point;

  /**
   * Gets the origin point of the rectangle.
   */
  public get origin(): Point {
    return this._position;
  }

  /**
   * Sets the origin point of the rectangle.
   */
  public set origin(value: Point) {
    this._position = value;
  }

  /**
   * The size of the rectangle.
   */
  private _size: Size;

  /**
   * Gets the size of the rectangle.
   */
  public get size(): Size {
    return this._size;
  }

  /**
   * Sets the size of the rectangle.
   */
  public set size(value: Size) {
    this._size = value;
  }

  /**
   * Gets the width of the rectangle.
   */
  public get width(): number {
    return this._size.width;
  }

  /**
   * Gets the height of the rectangle.
   */
  public get height(): number {
    return this._size.height;
  }

  /**
   * Gets the x-coordinate of the rectangle.
   */
  public get x(): number {
    return this._position.x;
  }

  /**
   * Gets the y-coordinate of the rectangle.
   */
  public get y(): number {
    return this._position.y;
  }

  /**
   * Gets the left edge of the rectangle.
   */
  public get left(): number {
    return this._position.x;
  }

  /**
   * Gets the right edge of the rectangle.
   */
  public get right(): number {
    return this._position.x + this._size.width;
  }

  /**
   * Gets the top edge of the rectangle.
   */
  public get top(): number {
    return this._position.y;
  }

  /**
   * Gets the bottom edge of the rectangle.
   */
  public get bottom(): number {
    return this._position.y + this._size.height;
  }

  /**
   * Gets the center point of the rectangle.
   */
  public get center(): Point {
    return new Point(
      this._position.x + this._size.width / 2,
      this._position.y + this._size.height / 2,
    );
  }

  /**
   * Creates an instance of a rectangle.
   * @param origin - The origin point of the rectangle.
   * @param size - The size of the rectangle.
   */
  constructor(origin: Point, size: Size) {
    this._position = origin;
    this._size = size;
  }
}

/**
 * Represents a circle with a center point and a radius.
 */
export class Circle {
  /**
   * The center point of the circle.
   */
  private _center: Point;

  /**
   * Gets the center point of the circle.
   */
  public get center(): Point {
    return this._center;
  }

  /**
   * Sets the center point of the circle.
   */
  public set center(value: Point) {
    this._center = value;
  }

  /**
   * The radius of the circle.
   */
  private _radius: number;

  /**
   * Gets the radius of the circle.
   */
  public get radius(): number {
    return this._radius;
  }

  /**
   * Sets the radius of the circle.
   */
  public set radius(value: number) {
    this._radius = value;
  }

  /**
   * Creates an instance of a Circle.
   * @param center - The center point of the circle.
   * @param radius - The radius of the circle.
   */
  constructor(center: Point, radius: number) {
    this._center = center;
    this._radius = radius;
  }
}
