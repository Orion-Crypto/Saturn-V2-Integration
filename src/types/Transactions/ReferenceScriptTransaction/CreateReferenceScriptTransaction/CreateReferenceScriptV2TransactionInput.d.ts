export interface CreateReferenceScriptV2TransactionInput {
    paymentAddress: string;

    // Separate component lists for transaction types
    referenceScriptComponents?: ReferenceScriptComponent[];
}

export interface ReferenceScriptComponent {
    plutusScriptId?: string;
}
