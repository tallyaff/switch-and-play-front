<template>
  <div class="game-preview" v-if="toy">
        <ul class="toy-preview-container">
            <!-- <li>{{toy._id}}</li> -->
            <li>{{game.name}}</li>
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