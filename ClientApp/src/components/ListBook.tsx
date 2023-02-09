import AddIcon from '@mui/icons-material/Add';
import ArrowIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import IconPhone from '@mui/icons-material/esm/LocalPhone';
import InputAdornment from '@mui/material/InputAdornment';
import IListBookItem from '../msc/IListBookItem';
import List from '@mui/material/List';
import ListBookForm from './ListBookForm.tsx';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { Component, Fragment, ReactElement } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { grey } from '@mui/material/colors';
import { ICrudPropRequest, ICrudStateArray } from '../msc/ICrud'
import { IPhoneBookReadFilterData } from '../msc/FilterData';

/** Defines the properties for a list book. */
export interface IListBookProps extends ICrudPropRequest<IListBookItem, IPhoneBookReadFilterData> {
    title: string;
    addButtonLabel: string;
}

/** Defines the state for a list book. */
export interface IListBookState extends ICrudStateArray<IListBookItem> {
    errorMessage: string;
    isFormOpen: boolean;
    formItem?: IListBookItem;
    lastNameFilter: string;
}

/** Represents a list book component. */
export class ListBook extends Component<IListBookProps, IListBookState> {
    private formType: 'update' | 'create';
    private formTitle: string;
    private lastNameFilterSnapshot: string;

    /** Initialises a new instance of the ListBook class. */
    constructor(props: IListBookProps) {
        super(props);
        this.state = {
            dataSource: [],
            isCreating: false,
            isDeleting: false,
            isReading: false,
            isUpdating: false,
            isCreatingError: false,
            isDeletingError: false,
            isReadError: false,
            isUpdatingError: false,
            errorMessage: '',
            isFormOpen: false,
            lastNameFilter: ''
        };

        this.lastNameFilterSnapshot = '';

        // event handlers
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreateSuccess = this.handleCreateSuccess.bind(this);
        this.handleCreateReject = this.handleCreateReject.bind(this);
        this.handleReadSuccess = this.handleReadSuccess.bind(this);
        this.handleReadReject = this.handleReadReject.bind(this);
        this.handleUpdateSuccess = this.handleUpdateSuccess.bind(this);
        this.handleUpdateReject = this.handleUpdateReject.bind(this);
        this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this);
        this.handleDeleteReject = this.handleDeleteReject.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchBarKeyPress = this.handleSearchBarKeyPress.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    }

    /** Triggers when the component mounts. */
    public componentDidMount() {
        !this.props.shouldTriggerReadOnMount || this.read();
    }

    /** Renders the component. */
    public render(): ReactElement {
        const isBusy: boolean = this.state.isReading || this.state.isUpdating || this.state.isCreating || this.state.isDeleting;
        const isError: boolean = this.state.isReadError || this.state.isUpdatingError || this.state.isCreatingError || this.state.isDeletingError;

        let element: ReactElement;

        // show busy, else show error, else show element
        if (isBusy) {
            element = <span>Loading <CircularProgress color="secondary" /></span>
        }
        else if (isError) {
            element = <span>{this.state.errorMessage}</span>
        }
        else {
            element = this.renderList();
        }

        const titleBar: ReactElement =
            <div className="listbook-titlebar">
                <Typography className="listbook-title" variant="h5" component="h2">
                    {this.props.title}
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={this.handleAddItem}>
                    {this.props.addButtonLabel}
                </Button>
            </div>

        // search bar
        const textField: ReactElement =
            <Fragment>
                <TextField
                    autoFocus
                    className="listbook-searchfilter"
                    name="lastNameFilter"
                    label="Search for contact by last name..."
                    size="small"
                    onChange={this.handleChange}
                    onKeyPress={this.handleSearchBarKeyPress}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {
                                    this.state.lastNameFilter !== this.lastNameFilterSnapshot ?
                                        <Tooltip title="Search (enter)">
                                            <IconButton color="primary" aria-label="apply search (enter)" component="label" onClick={this.handleSearchButtonClick}>
                                                <ArrowIcon />
                                            </IconButton>
                                        </Tooltip> :
                                        <Fragment />
                                }
                            </InputAdornment>
                        )
                    }}
                />   
            </Fragment>;

        return (
            <div className="listbook-root" >
                {titleBar}
                {textField}
                {element}
                <ListBookForm
                    isOpen={this.state.isFormOpen}
                    formType={this.formType}
                    isBusy={isBusy}
                    data={this.state.formItem}
                    title={this.formTitle}
                    onClose={this.handleClose}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }

    /** Key press event for the search bar to trigger a read when pressing enter. */
    private handleSearchBarKeyPress(event: any) {
        if (event.key === 'Enter') {
            this.handleSearchButtonClick();
        }
    }

    /** Key press event for the search button is pressed. */
    private handleSearchButtonClick() {
        this.read();

        // store last filter name value for filter button display logic
        this.lastNameFilterSnapshot = this.state.lastNameFilter;
    }

    /** Event handler for form input. */
    private handleChange(event: any) {
        const name = event.target.name;
        const value = event.target.value;
        const data = { ...this.state, [name]: value }
        this.setState(data);
    }

    /** Event handler for when the form is closed. */
    private handleSubmit(value: IListBookItem, formType: 'update' | 'create') {
        switch (formType) {
            case 'create': this.create(value);
                break;

            case 'update': this.update(value);
                break;
        }
    };

    /** Event handler for when the form is closed. */
    private handleClose() {
        this.setState({
            isFormOpen: false,
            formItem: null
        });
    };

    /** Event handler for when an item is added. */
    private handleAddItem() {
        this.formType = 'create';
        this.formTitle = 'Create entry';
        this.setState({
            isFormOpen: true,
            formItem: { id: 0, msisdn: "", name: "" }
        });
    }

    /** Event handler for when an item is added. */
    private handleEditItem(item: IListBookItem) {
        this.formType = 'update';
        this.formTitle = 'Edit entry';
        this.setState({
            isFormOpen: true,
            formItem: item
        });
    }

    /** Rendes the list. */
    public renderList(): ReactElement {
        if (this.state.dataSource.length === 0) {
            return <Fragment />
        }

        const listItems: ReactElement[] = this.state.dataSource.map(a =>
            <ListItem className="listbook-list-item" key={a.id} secondaryAction={
                <Fragment>
                    <Tooltip title="Edit">
                        <IconButton edge="end" aria-label="edit" onClick={() => this.handleEditItem({ ...a })}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton edge="end" aria-label="delete" onClick={() => this.delete({ ...a })}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Fragment>
            }>
                <IconPhone className="listbook-list-phoneicon" fontSize="small" sx={{ color: grey[500] }} />
                <ListItemText primary={a.name} secondary={a.msisdn} />
            </ListItem>);

        return (
            <List className="listbook-list">
                {listItems}
            </List>
        );
    }

    /** Creates an item for the datasource */
    private async create(item: IListBookItem) {
        this.props.create(item)
            .then(this.handleCreateSuccess)
            .catch(this.handleCreateReject);

        this.setState({ isCreating: true, isCreatingError: false });
    }

    /** Event when read is successful. */
    private async handleCreateSuccess(item: IListBookItem) {
        // copy current datasource
        const dataSourceCopy: IListBookItem[] = this.state.dataSource;

        // add to datasource
        dataSourceCopy.push(item);

        // update data source
        this.setState({ dataSource: dataSourceCopy, isCreating: false, isCreatingError: false, isFormOpen: false, formItem: { id: 0, msisdn: "", name: "" } });
    }

    /** Event when read fails. */
    private async handleCreateReject(error: string) {
        this.setState({ isCreating: false, isCreatingError: true, errorMessage: "There was an error creating the entry." });
    }

    /** Deletes an item for the datasource */
    private async delete(item: IListBookItem) {
        // delete remote datasource
        this.props.delete(item)
            .then(this.handleDeleteSuccess)
            .catch(this.handleDeleteReject);

        this.setState({ isDeleting: true, isDeletingError: false });
    }

    /** Event when delete is successful. */
    private async handleDeleteSuccess(item: IListBookItem) {
        // copy current datasource
        const dataSourceCopy: IListBookItem[] = this.state.dataSource;

        // delete from local datasource
        const index: number = dataSourceCopy.findIndex(a => a.id === item.id);
        dataSourceCopy.splice(index, 1);

        // update data source
        this.setState({ dataSource: dataSourceCopy, isDeleting: false, isDeletingError: false });
    }

    /** Event when delete fails. */
    private async handleDeleteReject(error: string) {
        this.setState({ isDeleting: false, isDeletingError: true, errorMessage: "There was an error deleting the entry." });
    }

    /** Reads the datasource data. */
    private async read() {
        // read remote datasource
        this.props.read({ lastNameFilter: this.state.lastNameFilter })
            .then(this.handleReadSuccess)
            .catch(this.handleReadReject);

        this.setState({ isReading: true, isReadError: false });
    }

    /** Event when read is successful. */
    private async handleReadSuccess(data: IListBookItem[]) {
        this.setState({ dataSource: data, isReading: false, isReadError: false });
    }

    /** Event when read fails. */
    private async handleReadReject(error: string) {
        this.setState({ isReading: false, isReadError: true, errorMessage: "There was an error fetching the entries." });
    }

    /** Updates an item for the datasource */
    private async update(item: IListBookItem) {
        // update remote datasource
        this.props.update(item)
            .then(this.handleUpdateSuccess)
            .catch(this.handleUpdateReject);

        this.setState({ isUpdating: true, isUpdatingError: false });
    }

    /** Event when update is successful. */
    private async handleUpdateSuccess(item: IListBookItem) {
        // copy current datasource
        const dataSourceCopy: IListBookItem[] = this.state.dataSource;

        // update local datasource
        const index: number = dataSourceCopy.findIndex(a => a.id === item.id);
        dataSourceCopy[index] = item;

        // update data source
        this.setState({ dataSource: dataSourceCopy, isUpdating: false, isUpdatingError: false, isFormOpen: false, formItem: { id: 0, msisdn: "", name: "" } });
    }

    /** Event when update fails. */
    private async handleUpdateReject(error: string) {
        this.setState({ isUpdating: false, isUpdatingError: true, errorMessage: "There was an error updating the entry." });
    }
}

export default ListBook;