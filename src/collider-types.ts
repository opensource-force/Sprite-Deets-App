import { Circle, Point, Rectangle, Size } from "./common-types.ts";

export enum ColliderType {
  AABB = "aabb",
  BOUNDING_BOX = "bounding_box",
  CIRCLE = "circle",
  POLYGON = "polygon",
  CAPSULE = "capsule",
  NONE = "none",
}

export abstract class Collider {
  protected _colliderType: ColliderType;

  public get colliderType(): ColliderType {
    return this._colliderType;
  }

  public abstract getAABB(): AxisAlignedBoundingBoxCollider;
  public abstract getCircle(): CircleCollider;

  constructor(colliderType: ColliderType) {
    this._colliderType = colliderType;
  }
}

export class AxisAlignedBoundingBoxCollider extends Collider {
  private _rectangle: Rectangle;

  public get rectangle(): Rectangle {
    return this._rectangle;
  }

  public set rectangle(value: Rectangle) {
    this._rectangle = value;
  }

  constructor(rectangle: Rectangle) {
    super(ColliderType.AABB);
    this._rectangle = rectangle;
  }

  public override getAABB(): AxisAlignedBoundingBoxCollider {
    return this;
  }

  public override getCircle(): CircleCollider {
    const center = new Point(
      this._rectangle.origin.x + this._rectangle.size.width / 2,
      this._rectangle.origin.y + this._rectangle.size.height / 2,
    );
    const radius = Math.sqrt(
      Math.pow(this._rectangle.size.width, 2) +
        Math.pow(this._rectangle.size.height, 2),
    ) / 2;
    return new CircleCollider(new Circle(center, radius));
  }
}

export class BoundingBoxCollider extends Collider {
  private _center: Point;

  public get center(): Point {
    return this._center;
  }

  public set center(value: Point) {
    this._center = value;
  }

  private _size: Size;

  public get size(): Size {
    return this._size;
  }

  public set size(value: Size) {
    this._size = value;
  }

  private _rotation: number; // in degrees

  public get rotation(): number {
    return this._rotation;
  }

  public set rotation(value: number) {
    this._rotation = value;
  }

  public get corner1(): Point {
    const halfWidth = this._size.width / 2;
    const halfHeight = this._size.height / 2;
    const angle = this._rotation * Math.PI / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this._center.x - halfWidth * cos + halfHeight * sin;
    const y = this._center.y - halfWidth * sin - halfHeight * cos;
    return new Point(x, y);
  }

  public get corner2(): Point {
    const halfWidth = this._size.width / 2;
    const halfHeight = this._size.height / 2;
    const angle = this._rotation * Math.PI / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this._center.x + halfWidth * cos + halfHeight * sin;
    const y = this._center.y + halfWidth * sin - halfHeight * cos;
    return new Point(x, y);
  }

  public get corner3(): Point {
    const halfWidth = this._size.width / 2;
    const halfHeight = this._size.height / 2;
    const angle = this._rotation * Math.PI / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this._center.x - halfWidth * cos - halfHeight * sin;
    const y = this._center.y - halfWidth * sin + halfHeight * cos;
    return new Point(x, y);
  }

  public get corner4(): Point {
    const halfWidth = this._size.width / 2;
    const halfHeight = this._size.height / 2;
    const angle = this._rotation * Math.PI / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this._center.x + halfWidth * cos - halfHeight * sin;
    const y = this._center.y + halfWidth * sin + halfHeight * cos;
    return new Point(x, y);
  }

  constructor(center: Point, size: Size, rotation: number) {
    super(ColliderType.POLYGON);
    this._center = center;
    this._size = size;
    this._rotation = rotation;
  }

  public static fromCapsuleEnds(
    circle1: Circle,
    circle2: Circle,
  ): BoundingBoxCollider {
    const center = new Point(
      (circle1.center.x + circle2.center.x) / 2,
      (circle1.center.y + circle2.center.y) / 2,
    );
    const size = new Size(
      Math.abs(circle1.center.x - circle2.center.x) + circle1.radius +
        circle2.radius,
      Math.abs(circle1.center.y - circle2.center.y) + circle1.radius +
        circle2.radius,
    );
    const rotation = Math.atan2(
      circle2.center.y - circle1.center.y,
      circle2.center.x - circle1.center.x,
    ) * 180 / Math.PI;
    return new BoundingBoxCollider(center, size, rotation);
  }

  public override getAABB(): AxisAlignedBoundingBoxCollider {
    const minX = Math.min(
      this.corner1.x,
      this.corner2.x,
      this.corner3.x,
      this.corner4.x,
    );
    const minY = Math.min(
      this.corner1.y,
      this.corner2.y,
      this.corner3.y,
      this.corner4.y,
    );
    const maxX = Math.max(
      this.corner1.x,
      this.corner2.x,
      this.corner3.x,
      this.corner4.x,
    );
    const maxY = Math.max(
      this.corner1.y,
      this.corner2.y,
      this.corner3.y,
      this.corner4.y,
    );
    const origin = new Point(minX, minY);
    const size = new Size(maxX - minX, maxY - minY);
    return new AxisAlignedBoundingBoxCollider(new Rectangle(origin, size));
  }

  public override getCircle(): CircleCollider {
    const radius = Math.sqrt(
      Math.pow(this._size.width, 2) + Math.pow(this._size.height, 2),
    ) / 2;
    return new CircleCollider(new Circle(this._center, radius));
  }
}

export class CircleCollider {
  private _circle: Circle;

  public get circle(): Circle {
    return this._circle;
  }

  public set circle(value: Circle) {
    this._circle = value;
  }

  public get radius(): number {
    return this._circle.radius;
  }

  public get center(): Point {
    return this._circle.center;
  }

  constructor(circle: Circle) {
    this._circle = circle;
  }
}

export class CapsuleCollider extends Collider {
  private _circle1: Circle;
  private _circle2: Circle;

  public get circle1(): Circle {
    return this._circle1;
  }

  public set circle1(value: Circle) {
    this._circle1 = value;
  }

  public get circle2(): Circle {
    return this._circle2;
  }

  public set circle2(value: Circle) {
    this._circle2 = value;
  }

  public get getBoundingCircle(): CircleCollider {
    const center = new Point(
      (this._circle1.center.x + this._circle2.center.x) / 2,
      (this._circle1.center.y + this._circle2.center.y) / 2,
    );
    const radius = Math.sqrt(
      Math.pow(this._circle1.radius, 2) + Math.pow(this._circle2.radius, 2),
    ) / 2;
    return new CircleCollider(new Circle(center, radius));
  }

  public get getBoundingBox(): BoundingBoxCollider {
    return BoundingBoxCollider.fromCapsuleEnds(this._circle1, this._circle2);
  }

  constructor(circle1: Circle, circle2: Circle) {
    super(ColliderType.CAPSULE);
    this._circle1 = circle1;
    this._circle2 = circle2;
  }

  public override getAABB(): AxisAlignedBoundingBoxCollider {
    const minX = Math.min(
      this._circle1.center.x - this._circle1.radius,
      this._circle2.center.x - this._circle2.radius,
    );
    const minY = Math.min(
      this._circle1.center.y - this._circle1.radius,
      this._circle2.center.y - this._circle2.radius,
    );
    const maxX = Math.max(
      this._circle1.center.x + this._circle1.radius,
      this._circle2.center.x + this._circle2.radius,
    );
    const maxY = Math.max(
      this._circle1.center.y + this._circle1.radius,
      this._circle2.center.y + this._circle2.radius,
    );
    const position = new Point(minX, minY);
    const size = new Size(maxX - minX, maxY - minY);
    return new AxisAlignedBoundingBoxCollider(new Rectangle(position, size));
  }

  public override getCircle(): CircleCollider {
    const lengthBetweenCircles = Math.sqrt(
      Math.pow(this._circle1.center.x - this._circle2.center.x, 2) +
        Math.pow(this._circle1.center.y - this._circle2.center.y, 2),
    );
    const radius = lengthBetweenCircles / 2 + this._circle1.radius;
    const center = new Point(
      (this._circle1.center.x + this._circle2.center.x) / 2,
      (this._circle1.center.y + this._circle2.center.y) / 2,
    );
    return new CircleCollider(new Circle(center, radius));
  }
}
