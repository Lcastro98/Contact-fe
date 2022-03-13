import React, { Component } from 'react';
import './App.css';
import { ContactService } from './service/ContactService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';


import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component {
  constructor(){
    super();
    this.state = {}
    this.contactService = new ContactService();
  }

  componentDidMount(){
    this.contactService.getAll().then(data => this.setState({contacts: data}))
  }


  render() {
    return (
      <Panel header="Contactos" style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <DataTable value={this.state.contacts}>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Nombre"></Column>
          <Column field="phone" header="Teléfono"></Column>
          <Column field="email" header="E-mail"></Column>
          <Column field="dateBirth" header="Fecha de Nacimiento"></Column>
        </DataTable>
      </Panel>
    );
  }
}


