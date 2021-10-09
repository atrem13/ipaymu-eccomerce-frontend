<template>
    <h4>
        <router-link :to="{name: 'transaction.index'}" class="btn btn-sm btn-secondary">Back</router-link>
        Edit Transaction</h4>
    <hr>
    <form @submit.prevent="update" enctype="multipart/form-data">
            <div class="form-group">
                <label for="name" class="font-weight-bold">Name</label>
                <input 
                    type="text" 
                    class="form-control mb-3" 
                    v-model="transaction.name"
                />
                <div v-if="validation.name" class="mt-2 alert alert-danger">
                    {{ validation.name[0] }}
                </div>
            </div>
            <div class="form-group">
                <label for="name" class="font-weight-bold">Email</label>
                <input 
                    type="text" 
                    class="form-control mb-3" v-model="transaction.email"
                />
                <div v-if="validation.email" class="mt-2 alert alert-danger">
                    {{ validation.name[0] }}
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-end">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </div>
    </form>  
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { transactionouter, transactionoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const transaction = reactive({
            id: '',
            name: '',
            email: ''
        })

        const validation = ref([])

        const router = transactionouter()

        const route = transactionoute()

        onMounted(() => {
            axios.get(`http://localhost:8000/api/transaction/${route.params.id}`)
            .then(response => {
              transaction.id = response.data.data.id  
              transaction.name = response.data.data.name  
              transaction.email = response.data.data.email  
            }).catch(error => {
                console.log(error.response.data)
            })
        })


        function update() {
            let formData = new FormData()
            formData.append('id', transaction.id)
            formData.append('name', transaction.name)
            formData.append('email', transaction.email)
            axios({
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                },
                method: 'POST',
                url: `http://localhost:8000/api/transaction/update`,
                data: formData
            }).then(() => {
                router.push({
                    name: 'transaction.index'
                })
            }).catch(error => {
                validation.value = error.response.data
            })
        }

        return {
            transaction,
            validation,
            router,
            route,
            update,
        }

    }
}
</script>