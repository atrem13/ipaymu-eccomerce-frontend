<template>
    <div>
        <div class="row">
            <div class="col-6">
                <h4>Data product</h4>
            </div>
            <div class="col-6 text-end">
                <router-link :to="{name: 'product.create'}" class="btn btn-sm btn-success">Add New Data</router-link>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-4">
                <input type="text" class="form-control" placeholder="search product..." v-model="search" >
            </div>
            <div class="col-4"></div>
            <div class="col-2 text-end">
                <select v-model="selected_date" class="form-control">
                    <option value="">- Select Date -</option>
                    <option value="Tanggal Ganjil">
                        Tanggal Ganjil
                    </option>
                    <option value="Tanggal Genap">
                        Tanggal Genap
                    </option>
                </select>
            </div>
            <div class="col-2 text-end">
                <select v-model="selected_week" class="form-control">
                    <option value="">- Select Week -</option>
                    <option value="Minggu Ganjil">
                        Minggu Ganjil
                    </option>
                    <option value="Minggu Genap">
                        Minggu Genap
                    </option>
                </select>
            </div>
        </div>
        <table class="table table-striped table-bordered mt-4" id="datatable1">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Sell Price</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Keterangan Tanggal</th>
                    <th scope="col">Keterangan Minggu</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in searchedProducts" :key="product.id">
                    <td>{{ product.name }}</td>
                    <td>{{ formatRupiah(product.sell_price) }}</td>
                    <td>{{ dateTime(product.created_at) }}</td>
                    <td>{{ checkDate(product.created_at) }}</td>
                    <td>{{ checkWeek(product.created_at) }}</td>
                    <td>
                        <router-link :to="{name: 'product.edit', params:{id: product.id }}" class="btn btn-sm btn-warning me-1 text-white">Edit</router-link>
                        <button @click.prevent="remove(product.id, index)" class="btn btn-sm btn-danger me-1">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

                    
</template>

<script>
import moment from 'moment';
import axios from 'axios'
import { computed, onMounted, ref, reactive } from 'vue'


export default {
    setup() {
        let products = reactive([])
        let search = ref('')
        let selected_week = ref('')
        let selected_date = ref('')

        onMounted(() => {
            axios.get('http://localhost:8000/api/product')
            .then(response => {
                response.data.data.forEach((item) => {
                    products.push(item);
                });
            })
        })

        const remove = (id, index) => {
            axios.delete(`http://localhost:8000/api/product/${id}`)
            .then(() => {
                // products.value = products.value.filter(item => {
                //     return item.id !== id;
                // });
                products.splice(index, 1)
            }).catch(error => {
                console.log(error.response)
            })

        }

        const dateTime = (value) => {
            return moment(value).format('DD/MM/YYYY')
        }
        
        const checkWeek = (value) => {
            let week = moment(value).format('DD')
            let count_week = parseInt(week) / 7 % 2 
            return count_week == 0 || count_week > 1 ? 'Minggu Genap' : 'Minggu Ganjil'
        }

        const checkDate = (value) => {
            let date = moment(value).format('DD')
            let count_date = parseInt(date) % 2
            return count_date == 1 ? 'Tanggal Ganjil' : 'Tanggal Genap' 
        }

        const formatRupiah = (value) => {
            return "IDR " + value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
        }


        const searchedProducts  = computed(() => {
            if(selected_week.value != '' && selected_date.value != ''){
                return products.filter((product) => {
                    return product.name.toLowerCase().includes(search.value.toLowerCase()) && (selected_date.value == checkDate(product.created_at)) && (selected_week.value == checkWeek(product.created_at)) ;
                });
            }else if(selected_week.value != ''){
                return products.filter((product) => {
                    return product.name.toLowerCase().includes(search.value.toLowerCase()) && (selected_week.value == checkWeek(product.created_at)) ;
                });
            }else if(selected_date.value != ''){
                return products.filter((product) => {
                    return product.name.toLowerCase().includes(search.value.toLowerCase()) && (selected_date.value == checkDate(product.created_at)) ;
                });
            }else{
                return products.filter((product) => {
                    return (
                    product.name
                        .toLowerCase()
                        .includes(search.value.toLowerCase())
                    );
                });
            } 
        });


        return {
            searchedProducts ,
            search,
            remove,
            dateTime,
            checkDate,
            checkWeek,
            formatRupiah,
            selected_week,
            selected_date,
        }

    }

}

</script>