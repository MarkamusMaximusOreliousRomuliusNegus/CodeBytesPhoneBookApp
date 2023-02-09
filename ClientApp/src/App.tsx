import React, { Component } from 'react';
import TitleLogo from './img/TitleIcon.gif'
import Typography from '@mui/material/Typography';
import ListBook from './components/ListBook.tsx';
import { IPhoneBookApi } from './api/PhoneBookApi.tsx';

import './css/site.css';
import '@fontsource/roboto/400.css';

/** Defines the state for a list book. */
export interface IListBookProps {
    phoneBookApi: IPhoneBookApi
}

/** Class to hold the application page.*/
export default class App extends Component<IListBookProps> {
    render() {
        return (
            <div className="root">
                <Typography variant="h4" component="h1">
                    <img className="headerIcon" src={TitleLogo} alt="Title Logo" />
                    Phone Book App
                </Typography>
                <ListBook
                    title={"Contacts"}
                    addButtonLabel={"Add contact"}
                    create={this.props.phoneBookApi.create}
                    delete={this.props.phoneBookApi.delete}
                    read={this.props.phoneBookApi.read}
                    update={this.props.phoneBookApi.update} shouldTriggerReadOnMount={true} />
            </div>
        );
    }
}