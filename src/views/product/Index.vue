<template>
    <div>
        <idv class="row">
            <div class="col-6">
                <h4>Data product</h4>
            </div>
            <div class="col-6 text-end">
                <router-link :to="{name: 'product.create'}" class="btn btn-sm btn-success">Add New Data</router-link>
            </div>
        </idv>
        <hr>

        <table class="table table-striped table-bordered mt-4">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Sell Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="products.length == 0">
                    <td colspan="3" class="text-center">
                        Data Empty
                    </td>
                </tr>
                <tr v-for="(product, index) in products" :key="index">
                    <td>{{ product.name }}</td>
                    <td>{{ product.sell_price }}</td>
                    <td>
                        <router-link :to="{name: 'product.edit', params:{id: product.id }}" class="btn btn-sm btn-warning me-1">Edit</router-link>
                        <button @click.prevent="remove(product.id)" class="btn btn-sm btn-danger me-1">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

                    
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {

    setup() {
        let products = ref([])
        onMounted(() => {
            axios.get('http://localhost:8000/api/product')
            .then(response => {
              products.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function remove(id){
            axios.delete(`http://localhost:8000/api/product/${id}`)
            .then(() => {
                products.value = products.value.filter(item => {
                    return item.id !== id;
                });
                // products.value.splice(products.value.indexOf(index), 1);
            }).catch(error => {
                console.log(error.response.data)
            })

        }

        return {
            products,
            remove
        }

    }

}

</script>