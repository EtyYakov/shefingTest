import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';


export default function UsersTable(props) {
    const [selectedUser, setSelectedUser] = useState(null);
    const filters = {
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };

    const onRowSelect = (event) => {
        props.setShowPost(true)
    };

    const onRowUnselect = (event) => {
        props.setShowPost(false)
    };
    const changeUser = (e) => {
        if (e.value !== props.selectedUser)
            props.setSelectedUser(e.value)
        else {
            props.setShowPost(false)
            props.setSelectedUser(null)
        }

    }

    const header = () => {
        return (
            <InputText
                onChange={(e) => onFilterChange(e)}
                placeholder="Search by name or email"></InputText>
        );
    };

    const onFilterChange = (e) => {
        const val=e.target.value
        let _fd=props.users.filter(user => user.email.toLowerCase().includes(val.toLowerCase()) || user.name.toLowerCase().includes(val.toLowerCase()))
        props.setFilteredData(_fd)
    };

    return (
        <div className="card">
            <DataTable
                value={props.filteredData}
                responsive
                filters={filters}
                selectionMode="single"
                selection={selectedUser}
                onSelectionChange={(e) => changeUser(e)}
                filterDisplay="row"
                className='select-none'
                header={header}
                emptyMessage="No customers found."
                onRowSelect={onRowSelect}
                onRowUnselect={onRowUnselect}
            >
                <Column field="name" filter header="Name" className='select-none'></Column>
                <Column field="email" filter header="Email" className='select-none'></Column>
                <Column field="company.name" header="Company Name" className='select-none'></Column>
            </DataTable>
        </div>
    );
}