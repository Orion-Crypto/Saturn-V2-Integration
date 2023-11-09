import { SaturnError } from '@/types/Classes/saturnError';

export interface TransactionResult {
    transactionIds?: string[];
    error?: SaturnError;
}
