<template>
    <h4>
        <router-link :to="{name: 'product.index'}" class="btn btn-sm btn-secondary">Back</router-link>
        Edit Product</h4>
    <hr>
    <form @submit.prevent="update" enctype="multipart/form-data">
        <div class="form-group">
                <label for="name" class="font-weight-bold">Name</label>
                <input 
                    type="text" 
                    class="form-control mb-3" 
                    v-model="product.name"
                />
                <div v-if="validation.name" class="mt-2 alert alert-danger">
                    {{ validation.name[0] }}
                </div>
            </div>
            <div class="form-group">
                <label for="purchase_price" class="font-weight-bold">Purchase Price</label>
                <input 
                    type="text" 
                    class="form-control mb-3" 
                    v-model="product.purchase_price"
                />
                <div v-if="validation.purchase_price" class="mt-2 alert alert-danger">
                    {{ validation.purchase_price[0] }}
                </div>
            </div>
            <div class="form-group">
                <label for="sell_price" class="font-weight-bold">Sell Price</label>
                <input 
                    type="text" 
                    class="form-control mb-3" 
                    v-model="product.sell_price"
                />
                <div v-if="validation.sell_price" class="mt-2 alert alert-danger">
                    {{ validation.sell_price[0] }}
                </div>
            </div>
            <div class="form-group">
                <label for="sell_price" class="font-weight-bold">Description</label>
                <textarea 
                    type="text" 
                    class="form-control mb-3" 
                    v-model="product.description"
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
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const product = reactive({
            id: '',
            name: '',
            description: '',
            sell_price: '',
            purchase_price: '',
            myimg: '',
            myimg_preview: ''
        })

        const validation = ref([])

        const router = useRouter()

        const route = useRoute()

        onMounted(() => {
            axios.get(`http://localhost:8000/api/product/${route.params.id}`)
            .then(response => {
              product.id = response.data.data.id  
              product.name = response.data.data.name  
              product.description = response.data.data.description  
              product.sell_price = response.data.data.sell_price  
              product.purchase_price = response.data.data.purchase_price  
              product.myimg_preview = response.data.data.path_img  
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function fileImage(event){   
            product.myimg = event.target.files[0];
            product.myimg_preview = URL.createObjectURL(event.target.files[0]);  
        }

        function update() {
            let formData = new FormData()
            formData.append('myimg', product.myimg)
            formData.append('id', product.id)
            formData.append('name', product.name)
            formData.append('description', product.description)
            formData.append('sell_price', product.sell_price)
            formData.append('purchase_price', product.purchase_price)
            axios({
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                },
                method: 'POST',
                url: `http://localhost:8000/api/product/update`,
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
            route,
            update,
            fileImage
        }

    }
}
</script>