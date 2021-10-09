<template>
    <div>
        <h4>
            <router-link :to="{name: 'user.index'}" class="btn btn-sm btn-secondary">Back</router-link>
            Add New User</h4>
        <hr>
        <form @submit.prevent="store" enctype="multipart/form-data">
            <div class="form-group">
                <label for="name" class="font-weight-bold">Name</label>
                <input 
                    type="text" 
                    class="form-control mb-3" v-model="user.name"
                />
                <div v-if="validation.name" class="mt-2 alert alert-danger">
                    {{ validation.name[0] }}
                </div>
            </div>
            <div class="form-group">
                <label for="name" class="font-weight-bold">Email</label>
                <input 
                    type="text" 
                    class="form-control mb-3" v-model="user.email"
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
    </div>
</template>

<script>

import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

    setup() {
        const user = reactive({
            name: '',
            email: '',
        })

        const validation = ref([])

        const router = useRouter()


        function store() {
            let formData = new FormData()
            formData.append('name', user.name)
            formData.append('email', user.email)

            axios({
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                },
                method: 'POST',
                url: 'http://localhost:8000/api/user',
                data: formData
            }).then(() => {
                router.push({
                    name: 'user.index'
                })
            }).catch(error => {
                validation.value = error.response.data
            })
        }

        return {
            user,
            validation,
            router,
            store,
        }

    }

}
</script>