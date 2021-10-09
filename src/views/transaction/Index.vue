<template>
    <div>
        <div class="row">
            <div class="col-6">
                <h4>Data transaction</h4>
            </div>
            <div class="col-6 text-end">
                <router-link :to="{name: 'transaction.create'}" class="btn btn-sm btn-success">Add New Data</router-link>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-4">
                <input type="text" class="form-control" placeholder="search transaction..." v-model="search" >
            </div>
        </div>
        <table class="table table-striped table-bordered mt-4" id="datatable1">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in searchedTransactions" :key="transaction.id">
                    <td>{{ transaction.name }}</td>
                    <td>{{ transaction.email }}</td>
                    <td>
                        <router-link :to="{name: 'transaction.edit', params:{id: transaction.id }}" class="btn btn-sm btn-info me-1 text-white">Detail</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

                    
</template>

<script>
// import axios from 'axios'
import { computed, onMounted, ref, reactive } from 'vue'


export default {
    setup() {
        let transactions = reactive([])
        let search = ref('')

        onMounted(() => {
            // axios.get('http://localhost:8000/api/transaction')
            // .then(response => {
            //     response.data.data.forEach((item) => {
            //         transactions.push(item);
            //     });
            // })
        })


        const searchedTransactions  = computed(() => {
            return transactions.filter((transaction) => {
                return (
                transaction.name
                    .toLowerCase()
                    .includes(search.value.toLowerCase())
                );
            });
        });


        return {
            searchedTransactions ,
            search,
        }

    }

}

</script>