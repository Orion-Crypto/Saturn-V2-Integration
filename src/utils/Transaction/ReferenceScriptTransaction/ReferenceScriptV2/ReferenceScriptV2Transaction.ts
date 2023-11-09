import { ReferenceScriptComponent } from '@/types/Transactions/ReferenceScriptTransaction/CreateReferenceScriptTransaction/CreateReferenceScriptV2TransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableReferenceScriptTransaction } from '@/utils/Transaction/ReferenceScriptTransaction/ComposableReferenceScriptTransaction';

export const ReferenceScriptV2Transaction = async (referenceScriptComponents: ReferenceScriptComponent[]) => {
    const result = await ComposableReferenceScriptTransaction({ referenceScriptComponents: referenceScriptComponents });
    TransactionInfoTab(result);
    return result;
};
