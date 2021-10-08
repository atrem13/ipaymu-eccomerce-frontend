<template>
    <div>
        <h4>
            <router-link :to="{name: 'product.index'}" class="btn btn-sm btn-secondary">Back</router-link>
            Add New Product</h4>
        <hr>
        <form @submit.prevent="store" enctype="multipart/form-data">
            <div class="form-group">
                <label for="name" class="font-weight-bold">Name</label>
                <input 
                    type="text" 
                    class="form-control mb-3" v-model="product.name"
                />
                <div v-if="validation.name" class="mt-2 alert alert-danger">
                    {{ validation.name[0] }}
                </div>
            </div>
            <div class="form-group">
                <label for="purchase_price" class="font-weight-bold">Purchase Price</label>
                <input 
                    type="text" 
                    class="form-control mb-3" v-model="product.purchase_price"
                />
                <div v-if="validation.purchase_price" class="mt-2 alert alert-danger">
                    {{ validation.purchase_price[0] }}
                </div>
            </div>
            <div class="form-group">
                <label for="sell_price" class="font-weight-bold">Sell Price</label>
                <input 
                    type="text" 
                    class="form-control mb-3" v-model="product.sell_price"
                />
                <div v-if="validation.sell_price" class="mt-2 alert alert-danger">
                    {{ validation.sell_price[0] }}
                </div>
            </div>
            <div class="form-group">
                <label for="sell_price" class="font-weight-bold">Description</label>
                <textarea 
                    type="text" 
                    class="form-control mb-3" v-model="product.description"
                >
                </textarea>
                <div v-if="validation.description" class="mt-2 alert alert-danger">
                    {{ validation.description[0] }}
                </div>
            </div>
            <div class="form-group">
                <label for="sell_price" class="font-weight-bold">Image</label>
                <input 
                    ref="file"
                    type="file" 
                    class="form-control mb-3"
                    @change="fileImage" 
                />
                <div v-if="validation.myimg" class="mt-2 alert alert-danger">
                    {{ validation.myimg[0] }}
                </div>
            </div>
            <div class="form-group">
                <div v-if="product.myimg_preview" class="mb-3">
                    <img :src="product.myimg_preview" width="250" height="150">
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
        const product = reactive({
            name: '',
            description: '',
            sell_price: '',
            purchase_price: '',
            myimg: '',
            myimg_preview: ''
        })

        const validation = ref([])

        const router = useRouter()

        function fileImage(event){   
            product.myimg = event.target.files[0];
            product.myimg_preview = URL.createObjectURL(event.target.files[0]);  
        }

        function store() {
            let formData = new FormData()
            formData.append('myimg', product.myimg)
            formData.append('name', product.name)
            formData.append('description', product.description)
            formData.append('sell_price', product.sell_price)
            formData.append('purchase_price', product.purchase_price)

            axios({
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                },
                method: 'POST',
                url: 'http://localhost:8000/api/product',
                data: formData
            }).then(() => {
                router.push({
                    name: 'product.index'
                })
            }).catch(error => {
                validation.value = error.response.data
            })
        }

        return {
            product,
            validation,
            router,
            store,
            fileImage
        }

    }

}
</script>