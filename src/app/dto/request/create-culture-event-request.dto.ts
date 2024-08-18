export interface CreateCultureEventRequestDto {
  name: string;
  culture: string;
  description: string;
  longitude: number
  latitude: number;
  startDate: Date;
  endDate: Date;
}
