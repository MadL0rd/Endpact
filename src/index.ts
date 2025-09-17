import {
    HttpEndpointRequestAgnosticDto,
    makeEndpoint,
    type HttpApiEndpoint,
} from './http-api-endpoint'

import { HttpApiService } from './http-api-service'

export const endpact = {
    HttpApiService,
    makeEndpoint,
}
export declare namespace endpact {
    export type EndpointRequestDto = HttpEndpointRequestAgnosticDto
}

export { HttpApiService, makeEndpoint, type HttpApiEndpoint }
