/** Defines a read interface for a props class.
 *  @type TResponseData: The data type that will be returned.
 */
export interface IReadPropRequest<TResponseData, FilterData> {
    read: (additionalData?: FilterData) => Promise<Array<TResponseData>>;
    shouldTriggerReadOnMount: boolean;
}

/** Defines a create interface for a props class.
 *  @type TData: The data type that will be sent with the request and returned.
 */
export interface ICreatePropRequest<TData> {
    create: (requestData: TData) => Promise<TData>;
}

/** Defines a create interface for a props class.
 *  @type TData: The data type that will be sent with the request and returned.
 */
export interface IUpdatePropRequest<TData> {
    update: (requestData: TData) => Promise<TData>;
}

/** Defines a create interface for a props class.
 *  @type TData: The data type that will be sent with the request and returned.
 */
export interface IDeletePropRequest<TData> {
    delete: (requestData: TData) => Promise<TData>;
}

/** Defines a read interface for a props class.
 *  @type TRequestData: The data type that will be sent with the request.
 *  @type TResponseData: The data type that will be returned.
 */
export interface IReadPropRequestResponse<TRequestData, TResponseData> {
    read: (requestData: TRequestData) => Promise<Array<TResponseData>>;
    shouldTriggerReadOnMount: boolean;
}

/** Defines a create interface for a props class.
 *  @type TRequestData: The data type that will be sent with the request.
 *  @type TResponseData: The data type that will be returned.
 */
export interface ICreatePropRequestResponse<TRequestData, TResponseData> {
    create: (requestData: TRequestData) => Promise<TResponseData>;
}

/** Defines a create interface for a props class.
 *  @type TRequestData: The data type that will be sent with the request.
 *  @type TResponseData: The data type that will be returned.
 */
export interface IUpdatePropRequestResponse<TRequestData, TResponseData> {
    update: (requestData: TRequestData) => Promise<TResponseData>;
}

/** Defines a create interface for a props class.
 *  @type TRequestData: The data type that will be sent with the request.
 *  @type TResponseData: The data type that will be returned.
 */
export interface IDeletePropRequestResponse<TRequestData, TResponseData> {
    delete: (requestData: TRequestData) => Promise<TResponseData>;
}

/** Defines a read interface for a state class. */
export interface IReadState {
    isReading: boolean;
    isReadError: boolean;
}

/** Defines a create interface for a state class. */
export interface ICreateState {
    isCreating: boolean;
    isCreatingError: boolean;
}

/** Defines a create interface for a state class. */
export interface IUpdateState {
    isUpdating: boolean;
    isUpdatingError: boolean;
}

/** Defines a create interface for a state class. */
export interface IDeleteState {
    isDeleting: boolean;
    isDeletingError: boolean;
}

/** Defines a crud interface for a state class.
 *  @type T: The datasource item
 */
export interface ICrudStateArray<T> extends IReadState, ICreateState, IUpdateState, IDeleteState {
    dataSource?: T[]
}

/** Defines a crud interface for a state class.
 *  @type T: The datasource item
 */
export interface ICrudStateSingle<T> extends IReadState, ICreateState, IUpdateState, IDeleteState {
    dataSource?: T
}

/** Defines a crud interface for a props class.
 *  @type T: The request, response and datasource item
 */
export interface ICrudPropRequest<TData, FilterData> extends
    ICreatePropRequest<TData>,
    IReadPropRequest<TData, FilterData>,
    IUpdatePropRequest<TData>,
    IDeletePropRequest<TData> {
}