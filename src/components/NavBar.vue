<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item ">
            <router-link :to="{name: 'user.index'}" class="nav-link">User</router-link>
          </li>
          <li class="nav-item ">
            <router-link :to="{name: 'product.index'}" class="nav-link">Product</router-link>
          </li>
          <li class="nav-item ">
            <router-link :to="{name: 'transaction.index'}" class="nav-link">Transaction</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
