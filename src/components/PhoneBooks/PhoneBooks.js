import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from "../ContactList/ContactList"
import Filter from "../Filter/Filter"
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition, TransitionGroup, Transition } from "react-transition-group"
import "./PhoneBooks.css"


class PhoneBooks extends Component {
    state = {
        contacts: [],
        filter: '',
        start: false
    }
    componentDidMount() {
        const perContacts = localStorage.getItem("contacts")
        if (perContacts) {
            this.setState({
                contacts: JSON.parse(perContacts)
            })
        }
        this.setState({ start: true })
    }
    componentDidUpdate(prevProp, prevState) {
        if (prevState.contacts !== this.state.contacts) {
            localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
        }
    }
    addContact = (objContact) => {
        console.log(objContact);
        this.state.contacts.some(contact => contact.name === objContact.name)
            ? alert(`Контакт с именем ${objContact.name} уже существует!`)

            : this.setState((prev) => ({
                contacts: [...prev.contacts, {
                    ...objContact, id: uuidv4()
                }]
            }))
    }
    deleteContact = id => {
        this.setState({
            contacts: this.state.contacts.filter(contact => contact.id !== id)
        })
    }
    filterName = () => {
        return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    }
    stateFilter = (e) => {
        this.setState({ filter: e.target.value })
    }


    render() {
        return (
            <>
                <CSSTransition classNames="title" mountOnEnter timeout={800} in={this.state.start}>
                    <h1 className="title">Phonebook</h1>
                </CSSTransition>
                <ContactForm addContact={this.addContact} />
                <Filter stateFilter={this.stateFilter} filter={this.state.filter} />
                <h2 className="subTitle">Contacts</h2>

                <TransitionGroup className="contactList" component="ul">
                    {this.filterName().map(contact =>
                        <CSSTransition key={contact.id} classNames="list__item" timeout={800}>
                            <ContactList
                                {...contact}
                                deleteContact={this.deleteContact} />
                        </CSSTransition>)}
                </TransitionGroup>
            </>
        );
    }
}

export default PhoneBooks;