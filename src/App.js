import React, { Component } from 'react';
import './App.css';
import { ContactService } from './service/ContactService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      visible : false,
      contact: {
        id: null,
        name: null,
        phone: null,
        email: null,
        dateBirth: null
      },
      selectedContact : {

      }
    };
    this.items = [
      {
        label : 'Nuevo',
        icon : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar',
        icon : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    this.contactService = new ContactService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount(){
    this.contactService.getAll().then(data => this.setState({contacts: data}))
  }

  save() {
    console.log(this.state.contact)
    this.contactService.save(this.state.contact).then(data => {
      this.setState({
        visible : false,
        contact: {
          id: null,
          name: null,
          phone: null,
          email: null,
          dateBirth: null
        }
      });
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.contactService.getAll().then(data => this.setState({contacts: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.contactService.delete(this.state.selectedContact.id).then(data => {
        this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.contactService.getAll().then(data => this.setState({contacts: data}));
      });
    }
  }

  render() {
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Contactos">
          <DataTable value={this.state.contacts} paginator={true} rows="10" selectionMode="single" selection={this.state.selectedContact} onSelectionChange={e => this.setState({selectedContact: e.value})}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Nombre"></Column>
            <Column field="phone" header="Teléfono"></Column>
            <Column field="email" header="E-mail"></Column>
            <Column field="dateBirth" header="Fecha de Nacimiento"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Agregar contacto" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
          <form id="contact-form" name="contact-form">
              <span className="p-float-label">
                <InputText value={this.state.contact.name} style={{width : '100%'}} id="name" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let contact = Object.assign({}, prevState.contact);
                        contact.name = val;

                        return { contact };
                    })}
                  } />
                <label htmlFor="name">Nombre</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.contact.phone} style={{width : '100%'}} id="phone" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let contact = Object.assign({}, prevState.contact);
                        contact.phone = val

                        return { contact };
                    })}
                  } />
                <label htmlFor="phone">Teléfono</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.contact.email} style={{width : '100%'}} id="email" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let contact = Object.assign({}, prevState.contact);
                        contact.email = val

                        return { contact };
                    })}
                  } />
                <label htmlFor="email">E-mail</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.contact.dateBirth} style={{width : '100%'}} id="dateBirth" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let contact = Object.assign({}, prevState.contact);
                        contact.dateBirth = val

                        return { contact };
                    })}
                  } />
                <label htmlFor="dateBirth">Fecha de Nacimiento</label>
              </span>
            </form>
        </Dialog>
        <Toast ref={(el) => this.toast = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      contact: {
        id: null,
        name: null,
        phone: null,
        email: null,
        dateBirth: null
      }
    });
    document.getElementById("contact-form").reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      contact : {
        id: this.state.selectedContact.id,
        name: this.state.selectedContact.name,
        phone: this.state.selectedContact.phone,
        email: this.state.selectedContact.email,
        dateBirth : this.state.selectedContact.dateBirth
      }
    })
  }
}


