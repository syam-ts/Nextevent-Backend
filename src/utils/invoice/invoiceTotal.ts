interface IItems {
    details: string;
    quantity: number;
    rate: number;
    total: number;
}

const generateInvoiceTotal = (items: IItems[]): number => {
    const total = items.reduce((acc, curr) => {
        return (acc += curr.total);
    }, 0);

    return total;
};
