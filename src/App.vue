<template>
  <div class="container mt-5">
    <NavBar/>
    <div class="row">
        <div class="col-md-12">
            <div class="card border-0 rounded shadow">
              <div class="card-body">
                <router-view></router-view>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>


<script>
import NavBar from './components/NavBar.vue'
  export default {
    name: 'App',
    components: {
      NavBar
    }
  }
</script>
