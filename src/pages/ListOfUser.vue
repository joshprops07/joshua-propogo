<template>
    <q-separator />
    <div class="q-pt-sm" :class="lightDark? 'bg-standard':'bg-grey-10'">
        <q-page class="q-mx-xl">
            <!-- I'll create a table for data -->
            <!-- the title of the table, the rows of each data, the column which is the label of each column -->
            <!-- the row-key which is the name of the label of each column-->
            <div class="q-mt-md">
                <q-table
                title="LIST OF USERS"
                :rows="rows"
                :columns="columns"
                row-key="name"
                table-header-class="bg-grey-4"
                :loading="loading"
                >

                <!-- create template for each row and create also an action to edit and delete each data -->
                <template #body="props">
                    <q-tr :props="props">
                        <q-td key="name" :props="props">
                            {{ props.row.name }}
                        </q-td>
                            <q-td key="address" :props="props">
                                {{ props.row.address.street }}
                                {{ props.row.address.suite }}
                                {{ props.row.address.city }}
                                {{ props.row.address.zipcode }}
                        </q-td>
                        <q-td key="username" :props="props">
                            {{ props.row.username }}
                        </q-td>
                        <q-td key="email" :props="props">
                            {{ props.row.email.toLowerCase() }}
                        </q-td>
                        <q-td key="phone" :props="props">
                            {{ props.row.phone }}
                        </q-td>
                        <q-td key="website" :props="props">
                            {{ props.row.website }}
                        </q-td>
                        <q-td key="company" :props="props">
                            {{ props.row.company.name }}
                            {{ props.row.company.catchPhrase }}
                            {{ props.row.company.bs }}
                        </q-td>
                        <q-td class="q-gutter-x-sm" key="action" :prop="props">
                            <q-btn push  icon="edit" class="bg-teal text-white" @click.stop="toggleDialog(props.row, 'edit')"></q-btn>
                            <q-btn push  debounce="300" icon="delete" class="bg-negative text-white" @click.stop="toggleDialog(props.row, 'delete')"></q-btn>
                        </q-td>
                    </q-tr>
                    <q-tr>
                    </q-tr>
                </template>
                </q-table> 
                <!-- create show dialog for edit and delete to confirm if they want to edit and delete -->
                    <q-dialog v-model="showDialog" persistent>
                    <q-card>
                        <q-card-section class="row items-center">
                            <!-- for edit confirmation -->
                            <div v-if="toggleRow"  class="q-ma-sm">
                                  <q-avatar icon="edit" color="secondary" class="text-white" /> Are you sure you want to edit
                                <span class="text-teal">{{ toggleRow.name }}</span>?
                            </div>
                            <!-- for delete confirmation -->
                            <div v-else class="q-ma-md">
                                <q-avatar icon="delete" color="negative" class="text-white" />   Are you sure you want to delete
                                <span class="text-negative">{{ toDelete.name }}</span>?
                            </div>
                        </q-card-section>

                        <!-- button for edit and delete and click if they want to cancel or yes the confirmation -->
                        <q-card-actions align="right" class="q-pa-sm">
                        <q-btn push label="Cancel" color="negative" v-close-popup />
                        <q-btn push label="Yes" color="teal" v-close-popup @click="toggleRow ? onRowClick() : deleteTodo()" />
                        </q-card-actions>
                    </q-card>
                    </q-dialog>
            </div>
        </q-page>
    </div>
</template>

<script>
// Before to request an API using axios, I have to import the ref for value and axios to request an API data
import { ref } from 'vue';
import axios from 'axios';
// in this line is the import of the variables going from the composables files
import { rows, form, selectedRow, btnLoading, lightDark } from '../composables/Task';

export default {
    setup() {

        // let's create row that the value have to be an array
        
        // the columns have name, label, align and field for the data
        let columns = ref([
            {
                name: 'name',
                label: 'Name',
                align: 'center',
                field: 'name',
            },
            {
                name: 'address',
                label: 'Address',
                align: 'center',
                field: 'address'
            },
            {
                name: 'username',
                label: 'Username',
                align: 'center',
                field: 'username',
            },
            {
                name: 'email',
                label: 'Email',
                align: 'center',
                field: 'email',
            },
            {
                name: 'phone',
                label: 'Phone',
                align: 'center',
                field: 'phone',
            },
            {
                name: 'website',
                label: 'Website',
                align: 'center',
                field: 'website',
                sortable: true,
            },
            {
                name: 'company',
                label: 'Company',
                align: 'center',
                field: 'company'
            },
            {
                name: 'action',
                label: 'Actions',
                align: 'center',
            },
        ])


        // GET
        // Now I will get the API data using .get
        const getTodos = () => {
            axios 
            // get the url from the API
            .get('http://localhost:3000/users?_sort=id&_order=desc') 
            // then the response
            .then(response => {
                // the rows has a value of the data response
                rows.value = response.data
            })
        }
        // now the data will now get the output
        getTodos()

        // let index = rows.value.findIndex(t => t.id === id);
        // index !== -1 && (rows.value[index].onRowLoad = true)

        // create a function to show the dialog for the confirmation
        // but first the showDialog must have value of false to close the diaglog
        const showDialog = ref(false)
        const toggleDialog = (row, status) => {
            // here once the button clicked the diaglog will show
            showDialog.value = true   
            // toggleRow and toDelete are null value
            toggleRow.value = toDelete.value = null
            // so here the status once the status is not stricly equal to 'delete' it will output true nor false
            // status will see at the above which is the 'edit' and 'delete'
            status !== 'delete' ? (toggleRow.value = row) : (toDelete.value = row)
        }
        
        // here create a function to edit the data
        // then the dialog also show once the edit button clicked
        const toggleRow = ref(null)
        const loading = ref(false)
        const onRowClick = () => {
            loading.value = true 
            // set the timeout for 500 before to edit
            setTimeout(() => {
            selectedRow.value = toggleRow.value
            form.value.name = toggleRow.value.name
            form.value.street = toggleRow.value.address.street
            form.value.suite = toggleRow.value.address.suite
            form.value.city = toggleRow.value.address.city
            form.value.zipcode = toggleRow.value.address.zipcode
            form.value.username = toggleRow.value.username
            form.value.email = toggleRow.value.email
            form.value.phone = toggleRow.value.phone
            form.value.website = toggleRow.value.website
            form.value.companyName = toggleRow.value.company.name
            form.value.catchPhrase = toggleRow.value.company.catchPhrase
            form.value.bs = toggleRow.value.company.bs

            // then here the loading and dialog will close
            loading.value = false
            showDialog.value = false
            }, 500)
        }


        // DELETE
        // To delete each data from the table using .delete
        const toDelete = ref(null)
        const deleteTodo = () => {
            loading.value = true
            // set a timeout for 500 before to delete
            setTimeout(() => {
                  axios
                .delete(`http://localhost:3000/users/${toDelete.value.id}`)
                .then(response => {
                    rows.value = rows.value.filter(row => row.id !== toDelete.value.id)
                })
                // catch the error if there's an error
                .catch(error => console.log(error)) 

                // then the loading and dialog will close
                loading.value = false
                showDialog.value = false
            }, 500)
        };


    //     fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(json => console.log(json))


    // it must have to return all the varibles and functions to render and show the output since I used composition API
        return {
              rows, 
              columns, 
              onRowClick, 
              deleteTodo, 
              loading, 
              form, 
              selectedRow, 
              btnLoading,
              lightDark,
              showDialog,
              toggleDialog,
              toggleRow,
              toDelete
        }
    },
}
</script>
