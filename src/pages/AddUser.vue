<template>
    <q-separator />
    <div class="q-pa-sm" :class="lightDark? 'bg-standard':'bg-grey-10'">
    <q-page class="q-ma-xl">
        <!-- create card first for form -->
        <q-card class="q-ma-xl">
            <h3 class="text-bold bg-teal text-center text-white q-pa-lg text-weight-medium">USERS' INFORMATION</h3>
            <div class="q-ma-xl">
                <!-- create a form -->
                <q-form @submit.prevent="!selectedRow.id ? addTodos() : updateTodo()"  class="q-gutter-sm">
                <div class="q-gutter-x-sm">
                 <q-input clearable clear-icon="close" lazy-rules 
                 :rules="[ val => val && val.length > 0 || 'Please type your name']" v-model="form.name" color="teal" outlined label="Name" />
                </div>
                 
                 <div class="row q-gutter-x-sm" >
                <q-input clearable clear-icon="close" lazy-rules class="col col"
                :rules="[ val => val && val.length > 0 || 'Please type your street']" v-model="form.street" color="teal" outlined label="Street" />
                <q-input clearable clear-icon="close" lazy-rules class="col col-md-5"
                :rules="[ val => val && val.length > 0 || 'Please type your suite']" v-model="form.suite" color="teal" outlined label="Suite" />
            </div>
                
            <div class="row q-gutter-sm">
                <q-input clearable clear-icon="close"  lazy-rules class="col col"
                :rules="[ val => val && val.length > 0 || 'Please type your city']" v-model="form.city" color="teal" outlined label="City" />
                <q-input clearable clear-icon="close"  lazy-rules class="col-3 col-md-5"
                 :rules="[ val => val && val.length > 0 || 'Please type your zipcode']" v-model="form.zipcode" color="teal" outlined label="Zipcode" />
            </div>
                
                 <div class="row q-gutter-sm">
                <q-input clearable clear-icon="close"   lazy-rules class="col-4 col-md-4"
                 :rules="[ val => val && val.length <= 5 || 'Please input your username at least 5 characters']" v-model="form.username" color="teal" outlined label="Username" />
                 <q-input clearable clear-icon="close" class="col col" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type your email']"  type="email"  v-model="form.email" color="teal" outlined label="Email" />
                 <q-input clearable clear-icon="close"   lazy-rules class="col-3 col-md-4"
                 :rules="[ val => val && val.length > 0 || 'Please type your phone number']"
                v-model="form.phone" color="teal" outlined label="Phone" />
                 </div>

                 <div class="q-gutter-sm">
                    <q-input clearable clear-icon="close"   lazy-rules class="col-12 col-md-12"
                 :rules="[ val => val && val.length > 0 || 'Please type your website']"  v-model="form.website" color="teal" outlined label="Website" />
                 </div>
               
                 <div class="row q-gutter-sm">
                <q-input clearable clear-icon="close"   lazy-rules class="col-4 col-md-4"
                 :rules="[ val => val && val.length > 0 || 'Please type the company name']" v-model="form.companyName" color="teal" outlined label="Company name" />
                <q-input clearable clear-icon="close"   lazy-rules class="col col"
                 :rules="[ val => val && val.length > 0 || 'Please type catchPhrase']" v-model="form.catchPhrase" color="teal" outlined label="CatchPhrase" />
                <q-input clearable clear-icon="close"   lazy-rules class="col-3 col-md-4"
                 :rules="[ val => val && val.length > 0 || 'Please type bs']"  v-model="form.bs" color="teal" outlined label="BS" />
                 </div>
                 <!-- reset button -->
                <div align="right" class="q-pb-lg q-gutter-x-sm">
                    <q-btn align="around" :loading="btnLoading" :icon="!selectedRow.id ? 'add' : 'edit'" type="submit" size="15px" class="q-px-lg bg-teal btn-fixed-width" push :label="!selectedRow.id ? 'Submit' : 'Update'" glossy color="primary"/>
                    <q-btn push :loading="resetLoading" label="Reset" type="reset" color="negative" @click="onReset" />
                </div>
            </q-form>
            </div>
        </q-card>
    </q-page>
</div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
// in this line is the import of the variables going from the composables files
import {rows, form, selectedRow, btnLoading, lightDark  } from '../composables/Task';

export default {
    setup() {

        // create a function to reset all the values in the input form
        const resetLoading = ref(false)
        const onReset = () => {
            resetLoading.value = true
            setTimeout(() => {
            form.value.name = null
            form.value.street = null
            form.value.suite = null
            form.value.city = null
            form.value.zipcode = null
            form.value.username = null
            form.value.email = null
            form.value.phone = null
            form.value.website = null
            form.value.companyName = null
            form.value.catchPhrase = null
            form.value.bs = null

            // the loading state will close after to reset
            resetLoading.value = false
            }, 500)
        };
        

        
          // POST
        // Create a function to add an information using .post
       const addTodos = () => {
            // now inside the function I have to value this as true once the function clicked then the btnLoading starts
            btnLoading.value = true;
            // set a timeout for 500 before to post
            setTimeout(() => {
                axios
            // it will post new date from the input form and each of form has own v-model value to post on the table
            .post('http://localhost:3000/users?_sort=id&_order=desc', 
            {
                // here's all the format
                name: form.value.name,
                address: {
                    street: form.value.street,
                    suite: form.value.suite,
                    city: form.value.city,
                    zipcode: form.value.zipcode
                },
                username: form.value.username,
                email: form.value.email,
                phone: form.value.phone,
                website: form.value.website,
                company: {
                    name: form.value.companyName,
                    catchPhrase: form.value.catchPhrase,
                    bs: form.value.bs
                }
            }
            )
            .then(response => {
                // In a JSON API, the server uses HTTP status codes to indicate the outcome of the request, such as whether the requested resource was found or an error occurred. 
                // The client can access the status code returned by the server using the response.status property.
                // For example, if a client sends a request to create a new user, and the server responds with a status code of 201 (Created),
                // A status code of 201 indicates that the request was successful, and the server has created a new resource. 
                // This is typically used when a new item has been added to a database or a new file has been uploaded to a server. 
                // This is also known as "Created" status.
                if (response.status === 201) {
                    // using unshift once the data created the new data create at the first in the table
                    rows.value.unshift(response.data);
                    form.value.name = null
                    form.value.street = null
                    form.value.suite = null
                    form.value.city = null
                    form.value.zipcode = null
                    form.value.username = null
                    form.value.email = null
                    form.value.phone = null
                    form.value.website = null
                    form.value.companyName = null
                    form.value.catchPhrase = null
                    form.value.bs = null
                }
            })
            .catch(error => console.log(error))
            // loading state will close
            btnLoading.value = false
            }, 500)
        };


        // PUT
        // update the data using .put
        const updateTodo = () => {
            btnLoading.value = true
            // set a timeout for 500 before to update
            setTimeout(() => {
                axios 
                // put all the data using the id
            .put(`http://localhost:3000/users/${selectedRow.value.id}`, 
            {
                // here's all the format once the data update and back to its own data
                name: form.value.name,
                username: form.value.username,
                address: {
                    street: form.value.street,
                    suite: form.value.suite,
                    city: form.value.city,
                    zipcode: form.value.zipcode
                },
                email: form.value.email,
                phone: form.value.phone,
                website: form.value.website,
                company: {
                  name: form.value.companyName,
                  catchPhrase: form.value.catchPhrase,
                  bs: form.value.bs
                }
            }
            )
            .then(response => {
                // then response if the status stricly equal to 200 
                // A response status code 200 in HTTP (Hypertext Transfer Protocol) means that the request has succeeded. 
                // The server has fulfilled the request and sent a response back to the client. 
                if(response.status === 200) {
                    // find the index
                    let index = rows.value.findIndex(
                        row => row.id === selectedRow.value.id
                    );
                    // once the data found the data will response and back to its own data 
                    rows.value[index].name = response.data.name
                    rows.value[index].address.street = response.data.address.street
                    rows.value[index].address.suite = response.data.address.suite
                    rows.value[index].address.city = response.data.address.city
                    rows.value[index].address.zipcode = response.data.address.zipcode
                    rows.value[index].username = response.data.username
                    rows.value[index].email = response.data.email
                    rows.value[index].phone = response.data.phone
                    rows.value[index].website = response.data.website
                    rows.value[index].company.name = response.data.company.name
                    rows.value[index].company.catchPhrase = response.data.company.catchPhrase
                    rows.value[index].company.bs = response.data.company.bs

                    form.value.name = null
                    form.value.street = null
                    form.value.suite = null
                    form.value.city = null
                    form.value.zipcode = null
                    form.value.username = null
                    form.value.email = null
                    form.value.phone = null
                    form.value.website = null
                    form.value.companyName = null
                    form.value.catchPhrase = null
                    form.value.bs = null

                    // for all the updated data object 
                    selectedRow.value = {}
                }
            });
            // the loadind state will close
            btnLoading.value = false
            }, 500)
        };
        


        // always to return the functions and variables to render and show the ouput
        return {
            rows,
            form,
            lightDark,
            onReset,
            resetLoading,
            selectedRow, 
            btnLoading, 
            addTodos,
            updateTodo,
        }
    },
}
</script>