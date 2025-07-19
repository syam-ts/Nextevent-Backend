
const generateInvoiceNumber = (): number => {
    return Math.floor(Math.random() * (99999999999 - 10000000000)) + 10000000000;
};
