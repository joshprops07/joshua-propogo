import { ref } from 'vue'

// let MyTasks = ref([])
// let FinishedTasks = ref([])
// let DeletedTask = ref([])

// export { MyTasks, FinishedTasks, DeletedTask }

let rows = ref([])
let form = ref({
    name: null,
    street: null,
    suite: null,
    city: null,
    zipcode: null,
    username: null,
    email: null,
    phone: null,
    website: null,
    companyName: null,
    catchPhrase: null,
    bs: null
})

let selectedRow = ref({})
let btnLoading = ref(false)

let lightDark = ref(true)

export {rows, form, selectedRow, btnLoading, lightDark}


