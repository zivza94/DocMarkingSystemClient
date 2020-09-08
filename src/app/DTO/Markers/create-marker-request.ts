import { MarkerLocation } from './marker-location'

export class CreateMarkerRequest {
    public DocID:string
    public MarkerType:string
    public MarkerLocation:MarkerLocation
    public ForeColor:string
    public BackColor:string
    public UserID:string
}
