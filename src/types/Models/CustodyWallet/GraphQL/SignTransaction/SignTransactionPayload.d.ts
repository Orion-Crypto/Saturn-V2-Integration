import { SaturnError } from '@/types/Classes/saturnError';

export interface SignTransactionPayload {
    signedHexTransaction: string;
    error?: SaturnError;
}
