<template>
    <div>
        <div class="row">
            <div class="col-6">
                <h4>Data user</h4>
            </div>
            <div class="col-6 text-end">
                <router-link :to="{name: 'user.create'}" class="btn btn-sm btn-success">Add New Data</router-link>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-4">
                <input type="text" class="form-control" placeholder="search user..." v-model="search" >
            </div>
        </div>
        <table class="table table-striped table-bordered mt-4" id="datatable1">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in searchedUsers" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <router-link :to="{name: 'user.edit', params:{id: user.id }}" class="btn btn-sm btn-warning me-1 text-white">Edit</router-link>
                        <button @click.prevent="remove(user.id, index)" class="btn btn-sm btn-danger me-1">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

                    
</template>

<script>
import axios from 'axios'
import { computed, onMounted, ref, reactive } from 'vue'


export default {
    setup() {
        let users = reactive([])
        let search = ref('')

        onMounted(() => {
            axios.get('http://localhost:8000/api/user')
            .then(response => {
                response.data.data.forEach((item) => {
                    users.push(item);
                });
            })
        })

        const remove = (id, index) => {
            axios.delete(`http://localhost:8000/api/user/${id}`)
            .then(() => {
                users.splice(index, 1)
            }).catch(error => {
                console.log(error.response)
            })

        }


        const searchedUsers  = computed(() => {
            return users.filter((user) => {
                return (
                user.name
                    .toLowerCase()
                    .includes(search.value.toLowerCase())
                );
            });
        });


        return {
            searchedUsers ,
            search,
            remove,
        }

    }

}

</script>