import { InventoryBook } from './IntentoryBook';
import { User } from './User';

export interface Lease {
    id: number;
    timeOfLease: string;
    dueTime: string;
    returned: boolean;
    inventoryBook: InventoryBook;
    user: User;
}
