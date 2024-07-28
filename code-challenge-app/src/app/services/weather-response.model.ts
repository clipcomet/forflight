// weather.model.ts

export interface WindTemp {
    directionFromTrue: number;
    knots: number;
    celsius: number;
    altitude: number;
    isLightAndVariable: boolean;
    isGreaterThan199Knots: boolean;
    turbulence: boolean;
    icing: boolean;
  }
  
  export interface WindsAloftPeriod {
    validTime: string;
    period: {
      dateStart: string;
      dateEnd: string;
    };
    windTemps: { [key: string]: WindTemp };
  }
  
  export interface WindsAloft {
    lat: number;
    lon: number;
    dateIssued: string;
    windsAloft: WindsAloftPeriod[];
    source: string;
  }
  
  export interface Visibility {
    distanceSm: number;
    distanceQualifier: number;
    prevailingVisSm: number;
    prevailingVisDistanceQualifier: number;
  }
  
  export interface Wind {
    speedKts: number;
    direction: number;
    variableFrom?: number;
    variableTo?: number;
    from?: number;
    to?: number;
    variable: boolean;
  }
  
  export interface CloudLayer {
    coverage: string;
    altitudeFt: number;
    ceiling: boolean;
  }
  
  export interface Conditions {
    text: string;
    ident: string;
    dateIssued: string;
    lat: number;
    lon: number;
    elevationFt: number;
    tempC: number;
    dewpointC: number;
    pressureHg: number;
    pressureHpa: number;
    reportedAsHpa: boolean;
    densityAltitudeFt: number;
    relativeHumidity: number;
    flightRules: string;
    cloudLayers: CloudLayer[];
    cloudLayersV2: CloudLayer[];
    weather: any[];
    visibility: Visibility;
    wind: Wind;
  }
  
  export interface ForecastCondition extends Conditions {
    period: {
      dateStart: string;
      dateEnd: string;
    };
  }
  
  export interface Forecast {
    text: string;
    ident: string;
    dateIssued: string;
    period: {
      dateStart: string;
      dateEnd: string;
    };
    lat: number;
    lon: number;
    elevationFt: number;
    conditions: ForecastCondition[];
  }
  
  export interface WeatherReport {
    conditions: Conditions;
    forecast: Forecast;
    windsAloft: WindsAloft;
  }
  
  export interface WeatherResponse {
    report: WeatherReport;
  }