import IListBookItem from '../msc/IListBookItem';
import { IPhoneBookReadFilterData } from '../msc/FilterData';

/** Defines a phone bood api. */
export interface IPhoneBookApi {
    create: (item: IListBookItem) => Promise<IListBookItem>,
    delete: (item: IListBookItem) => Promise<IListBookItem>,
    read: (filterData: IPhoneBookReadFilterData) => Promise<IListBookItem[]>,
    update: (item: IListBookItem) => Promise<IListBookItem>
};

/** An API for sending data to the phone book controller. */
export class PhoneBookApi implements IPhoneBookApi {
    /**
     * Creates a phone book item on the remotes server.
     * @item: The item to create.
     */
    public async create(item: IListBookItem): Promise<IListBookItem> {
        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');

        const req: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(item)
        };

        const response: Response = await fetch('phonebook', req);

        if (response.ok) {
            const data: IListBookItem = await response.json();
            return Promise.resolve(data);
        }
        else {
            return Promise.reject("An error occured while creating the phone book data.")
        }
    }

    /**
     * Deletes a phone book item on the remotes server.
     * @item: The item to delete.
     */
    public async delete(item: IListBookItem): Promise<IListBookItem> {
        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');

        const req: RequestInit = {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(item)
        };

        const response: Response = await fetch('phonebook', req);

        if (response.ok) {
            const data: IListBookItem = await response.json();
            return Promise.resolve(data);
        }
        else {
            return Promise.reject("An error occured while deleting the phone book data.")
        }
    }

    /**
     * Returns a collection of phone book items from the remotes server.
     * @filterData: The filter data to filter the read results with.
     */
    public async read(filterData: IPhoneBookReadFilterData): Promise<IListBookItem[]> {
        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');

        const req: RequestInit = {
            method: 'GET',
            headers: headers
        };

        const url: string = 'phonebook?' + new URLSearchParams({
            lastNameFilter: filterData.lastNameFilter
        });

        const response: Response = await fetch(url, req);

        if (response.ok) {
            const data: IListBookItem[] = await response.json();
            return Promise.resolve(data);
        }
        else {
            return Promise.reject("An error occured while reading the phone book data.")
        }
    }

    /**
     * Updates a phone book item on the remotes server.
     * @item: The item to update.
     */
    public async update(item: IListBookItem): Promise<IListBookItem> {
        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');

        const req: RequestInit = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(item)
        };

        const response: Response = await fetch('phonebook', req);

        if (response.ok) {
            const data: IListBookItem = await response.json();
            return Promise.resolve(data);
        }
        else {
            return Promise.reject("An error occured while deleting the phone book data.")
        }
    }
}

export default PhoneBookApi;