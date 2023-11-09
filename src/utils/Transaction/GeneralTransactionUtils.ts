import { TransactionResult } from '@/types/Transactions/TransactionResult';
import CardanoWallet from '@/utils/Cardano/wallet';

export const TransactionInfoTab = (result: TransactionResult) => {
    if (result.transactionIds && result.transactionIds.length > 0 && !result.error) {
        console.log(`Transaction Success! The transaction will appear on chain momentarily. TransactionId: ${result.transactionIds[0]}`);
    } else {
        if (result?.error?.code) {
            console.error(result.error);
            return;
        }
        console.log(`Transaction Failed! Please reach out for help in the Saturn Discord Server. TransactionId: ${result.error?.link}`);
    }
};

export const SignTransaction = async (hexTransaction: any) => {
    const tx = CardanoWallet.lucid?.fromTx(hexTransaction);
    const signedTx = await tx?.sign().complete();
    const signedHex = signedTx?.toString();
    return signedHex;
};

// We need a sign minting transaction because Lucid removes all redeemers with the same minted policy id
export const SignMintingTransaction = async (hexTransaction: any) => {
    const { C, toHex } = await import('lucid-cardano');

    // Reconstruct and sign tx
    const reconstructedTx: any = CardanoWallet.lucid?.fromTx(hexTransaction);
    let transactionWitnessSet: any = reconstructedTx?.txComplete.witness_set();

    let priorKeys = null;
    if (!transactionWitnessSet) {
        transactionWitnessSet = C.TransactionWitnessSet.new();
    } else {
        priorKeys = transactionWitnessSet.vkeys();
    }
    const signature: any = await CardanoWallet.lucid?.wallet.signTx(reconstructedTx.txComplete);

    const currentKeys = signature.vkeys();
    const priorKeysLength = priorKeys?.len() || 0;
    for (let i = 0; i < priorKeysLength; i++) {
        currentKeys.add(priorKeys.get(i));
    }
    transactionWitnessSet.set_vkeys(currentKeys);

    const signedTx = C.Transaction.new(reconstructedTx.txComplete.body(), transactionWitnessSet, reconstructedTx.txComplete.auxiliary_data());
    const signedBytes = signedTx.to_bytes();
    const signedHex = toHex(signedBytes);
    return signedHex;
};
