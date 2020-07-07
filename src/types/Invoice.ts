export interface Invoice {
    uid: number,
    title?: string,
    group?: "expense" | "income",
    date?: string,
    total: number,
    currency?: string,
    closed?: boolean,
    invoiceLines: InvoiceLine[]
}

export interface InvoiceLine {
    name: string,
    quantity: number,
    price: number
}