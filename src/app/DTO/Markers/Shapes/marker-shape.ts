import { MarkerLocation } from '../marker-location';

enum shapeType {rectangle, ellipse}
export abstract class MarkerShape {
    abstract draw(ctx:any)
    abstract toLocation():MarkerLocation
    abstract toString()
    abstract bold()
    abstract normal()
}
