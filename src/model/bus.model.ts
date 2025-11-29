export type Semester = 'REGULAR' | 'SEASONAL' | 'VACATION';

export type ProgressType = 'initial' | 'selectedSemester' | 'selectedFile' | 'completeUpload';

export interface BusRouteInfo {
  node_info: Node[];
  region: string;
  route_info: Route[];
  route_name: string;
  route_type: string;
  sub_name: string | null;
}

interface Node {
  name: string;
  detail: string | null;
}

interface Route {
  arrival_time: (string | null)[];
  detail: string | null;
  name: string;
}

export interface CommutingBusRouteInfoResponse {
  commuting_bus_timetables: BusRouteInfo[];
}

export interface ShuttleBusRouteInfoResponse {
  shuttle_bus_timetables: BusRouteInfo[];
}
