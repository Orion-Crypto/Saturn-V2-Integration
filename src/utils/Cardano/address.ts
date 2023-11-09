import CardanoWallet from '@/utils/Cardano/wallet';

//---------------------------------------------------------------------------//
// Address Functions That Check Wallet Network
//---------------------------------------------------------------------------//
export const isValidAddress = (address: string) => {
    try {
        const addressDetails: any = CardanoWallet.lucid?.utils.getAddressDetails(address);
        if (!addressDetails) return false;
        return true;
    } catch (error) {
        return false;
    }
};

export const isAddressEmptyOrValid = (address: string) => {
    return address === '' ? true : isValidAddress(address);
};
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Display Functions
//---------------------------------------------------------------------------//
export const truncateAddress = (address: string, startCharacters: number = 6, endCharacters: number = 4) => {
    if (!address || address.length <= startCharacters + endCharacters) {
        return address; // Return the original string if it has 10 or fewer characters
    }

    const firstSixLetters = address.slice(0, startCharacters);
    const lastFourLetters = address.slice(-endCharacters);

    return `${firstSixLetters}...${lastFourLetters}`;
};
//---------------------------------------------------------------------------//
