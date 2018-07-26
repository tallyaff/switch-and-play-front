<template>
  <div class="game-preview" v-if="game">
        <ul class="game-preview-container">
            <!-- :src="game.src"  -->
            <li>{{game.name}}</li>
            <img :src="game.src" :alt="'no image'"/>
            <li>Category: {{game.category}}</li>
            <li>Condition: {{game.condition}}</li>
            <li>Added at: {{game.addedAt}}</li>
            <li>
                <!-- v-if="user.isAdmin"  -->
                <button class="btn btn-remove" @click="$emit('remove', game._id)">Remove</button> 
                <router-link  tag="button" :to="'/game/edit/'+game._id">Edit</router-link> 
                <router-link tag="button" :to="'/game/'+game._id">More details</router-link>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: ["game"],

  methods: {

  },
  computed: {
    // user() {
    //   // console.log('user!!!!!!!!!!!!!!!!!!', this.$store.getters.setLoginUser);
    //   return this.$store.getters.setLoginUser;
    // },
 
  }
};
</script>