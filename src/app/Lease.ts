import { InventoryBook } from './IntentoryBook';

export interface Lease {
    id: number,
    timeOfLease: string,
    due_time: string,
    returned: boolean,
    inventoryBook: InventoryBook
    user: number
}
