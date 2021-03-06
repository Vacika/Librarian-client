import { InventoryBook } from './IntentoryBook';

export interface Lease {
    id: number,
    timeOfLease: string,
    dueTime: string,
    returned: boolean,
    inventoryBook: InventoryBook
    user: number
}
