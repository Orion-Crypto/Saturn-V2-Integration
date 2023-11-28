import { SaturnError } from '@/types/Classes/saturnError';

export interface GetRemainingTokensPayload {
    tokens?: string;
    error?: SaturnError;
}
