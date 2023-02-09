import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import React, { Component, Fragment, ReactElement } from 'react';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IListBookItem } from '../msc/IListBookItem';


export interface IListBookFormProps {
    formType: 'update' | 'create';
    isOpen: boolean;
    isBusy: boolean;
    title: string;
    data: IListBookItem;
    onClose?: () => void;
    onSubmit?: (value: IListBookItem, formType: 'update' | 'create') => void;
}

export interface IListBookFormState {
    data: IListBookItem;
    nameErrorMessage?: string;
    msisdnErrorMessage?: string;  
}

export class ListBookForm extends Component<IListBookFormProps, IListBookFormState> {

    /** Initialises a new instance of the ListBookForm class. */
    constructor(props: IListBookFormProps) {
        super(props);
        this.state = {
            data: props.data,
            nameErrorMessage: null,
            msisdnErrorMessage: null,
        };

        // event handlers
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormKeyPress = this.handleFormKeyPress.bind(this);
    }

    /** When component updates. */
    public componentDidUpdate(prevProps: IListBookFormProps) {

        if (prevProps.data !== this.props.data) {

            this.setState({ data: this.props.data });
        }
    }

    /** Renders the component. */
    public render(): ReactElement {

        const isNameError: boolean = this.state.nameErrorMessage != null;
        const isMsisdnError: boolean = this.state.msisdnErrorMessage != null;

        const spinner: ReactElement = this.props.isBusy ? <CircularProgress color="secondary" /> : <Fragment />

        return (
            <Dialog onClose={this.handleClose} open={this.props.isOpen}>
                <div className="listbookform-root">
                    <Typography className="listbookform-title" variant="subtitle1" component="h2">
                        {this.props.title}
                    </Typography>

                    <Box className="listbookform-root-form" onKeyPress={this.handleFormKeyPress}>
                        <TextField autoFocus 
                            label="Name"
                            name="name"
                            size="small"
                            error={isNameError}
                            variant="standard"
                            defaultValue={this.state.data?.name}
                            helperText={this.state?.nameErrorMessage}
                            onChange={this.handleChange} />

                        <TextField
                            label="Phone number"
                            size="small"
                            name="msisdn"
                            error={isMsisdnError}
                            variant="standard"
                            defaultValue={this.state.data?.msisdn}
                            helperText={this.state?.msisdnErrorMessage}
                            onChange={this.handleChange} />
                    </Box>
                    <div className="listbookform-footer">
                        <Tooltip title="Submit the form (enter)">
                            <Button className="listbookform-submit" variant="contained" onClick={this.handleSubmit}>Submit <div>{spinner}</div></Button>
                        </Tooltip>
                    </div>
                </div>
            </Dialog>
        );
    }

    /** Key press event for the search bar to trigger a read when pressing enter. */
    private handleFormKeyPress(event: any) {
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    }

    /** Event handler for handling input change. */
    private handleChange(event:any) {
        const name = event.target.name;
        const value = event.target.value;
        const data = { ...this.state.data, [name]: value }
        this.setState({ data: data });
    }

    /** Event handler for closing the form. */
    private handleClose() {
        this.props.onClose && this.props.onClose();
    };

    /** Event handler for submitting the form. */
    private handleSubmit() {
        if (this.ValidateForm()) {
            this.props.onSubmit && this.props.onSubmit(this.state.data, this.props.formType);

            // reset state data to clear the entry
            this.setState({ data: { id: 0, msisdn: '', name: '' } });
        }
    };

    /** 
     * Validates the form updating input errors.
     * Returns a value indicating whether the form input is valid.
     */
    private ValidateForm(): boolean {
        const [isMsisdnValid, msisdnErrorMessage] = this.isValidMsisdnField();
        const [isNameValid, nameErrorMessage] = this.isValidNameField();
        
        this.setState({ msisdnErrorMessage: msisdnErrorMessage, nameErrorMessage: nameErrorMessage });

        return isMsisdnValid && isNameValid;
    }

    /** Returns a value indicating whether the name field is valid. */
    private isValidNameField(): [boolean, string] {
        const name = this.state.data.name;

        if (name === null || name.length === 0) {
            return [false, 'Name is required'];
        }
        else {
            return [true, null];
        }
    }

    /** Returns a value indicating whether the msisdn field is valid. */
    private isValidMsisdnField(): [boolean, string] {
        const msisdn = this.state.data.msisdn;
        const validMsisdnExp = /[0-9,-]/g;

        if (msisdn === null || msisdn.length === 0) {
            return [false, 'Phone number is required'];
        }
        else if (!validMsisdnExp.test(msisdn)) {
            return [false, 'Invalid phone number'];
        }
        else {
            return [true, null];
        }
    }
}

export default ListBookForm;