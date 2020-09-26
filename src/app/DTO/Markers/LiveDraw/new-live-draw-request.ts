import { Line } from '../Shapes/line'

export class NewLiveDrawRequest {
    RequestType = "EndLiveDrawRequest"
    line:Line
}
