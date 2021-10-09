<template>
    <div>
        <h4>
            <router-link :to="{name: 'transaction.index'}" class="btn btn-sm btn-secondary">Back</router-link>
            Add New Transaction</h4>
        <hr>
        <form @submit.prevent="store" enctype="multipart/form-data">
            <div class="form-group mb-3">
                <label for="name" class="font-weight-bold">Customer</label>
                <select v-model="selected_customer" class="form-control">
                    <option value="">- Select Customer -</option>
                    <option v-for="(item, index) in customers" :key="index" :value="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="name" class="font-weight-bold">Products</label>
                <select v-model="selected_product" class="form-control">
                    <option value="">- Select Product -</option>
                    <option v-for="(item, index) in products" :key="index" :value="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="name" class="font-weight-bold">Qty</label>
                <input 
                    type="number" 
                    class="form-control mb-3" 
                    v-model="qty"
                />
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

import { onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const qty = ref(0)
        const customers = ref([])
        const products = ref([])
        const selected_customer = ref('')
        const selected_product = ref('')

        onMounted(() => {
            axios.get('http://localhost:8000/api/user')
            .then(response => {
                customers.value = response.data.data
            })
            
            axios.get('http://localhost:8000/api/product')
            .then(response => {
                products.value = response.data.data
            })
        })

        const router = useRouter()

        function store() {
            let formData = new FormData()
            formData.append('qty', qty)
            formData.append('product', selected_product)
            formData.append('buyerName', selected_customer)

            axios({
                headers: { 
                    'Content-Type': 'application/json',
                    'va': '1179000899', 
                    'timestamp': '20191209155701' 
                },
                method: 'POST',
                url: 'https://sandbox.ipaymu.com/api/v2/payment',
                data: formData
            }).then((response) => {
                console.log(response)
                // router.push({
                //     name: 'transaction.index'
                // })
            }).catch(error => {
                console.log(error.response.data)
            })
        }

        return {
            qty,
            selected_customer,
            selected_product,
            customers,
            products,
            router,
            store,
        }

    }

}
</script>