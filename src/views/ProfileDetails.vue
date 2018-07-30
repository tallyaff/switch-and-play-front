<template>
    <section>
        <p v-if="loggedinUser">
            Hello: {{'loggedinUser'? loggedinUser.username: 'guest'}}
        </p>
        <router-link :to="'/game/edit/'">
            <el-button v-if="loggedinUser" class="btn add-game-btn" type="primary" @click="checkIfDisplay">Add Game</el-button>
        </router-link>
        <router-link v-if="loggedinUser" :to="`/user/activity/${loggedinUser._id}`">
            <el-button class="btn activities-profile-btn" type="primary">My activities</el-button>
        </router-link>
        <div class="my-profile">
            <h2 class="headres-in-profile-details">My profile</h2>
            <el-button v-if="loggedinUser" v-show="!isEdit" class="btn edit-profile-btn" type="primary" @click="editProfile">Edit</el-button>
            <div v-if="copiedUser">
            <el-form v-if="isEdit" class="edit-user-profile no-margin" :label-position="labelPosition" @submit.native.prevent="saveUserProfile">
              <el-form-item class="form-item" label="username">
                <el-input v-model="copiedUser.username"/>
              </el-form-item>
              <el-form-item class="form-item" label="password" type="password">
                <el-input v-model="copiedUser.password"/>
              </el-form-item>
              <el-form-item class="form-item" label="email">
                <el-input v-model="copiedUser.email"/>
              </el-form-item>
              <el-form-item class="form-item" label="city">
                <el-input class="form-input" v-model="copiedUser.city"/>
              </el-form-item>
              <el-button class="btn save-profile-btn" type="primary" @click="saveUserProfile">Save</el-button>
              <el-button @click="$router.go(-1)">Cancel</el-button>
          </el-form>
        </div>
        <h2 class="headres-in-profile-details">Your games:</h2>
        <ul class="cards-in-profile-container flex" v-if="games">
           <li class="game" v-for="game in games" :key="game._id">
                <!-- <game-preview :game="game" :gameCheckbox="gameCheckbox" @check="updateGamesToSwitch"> -->
                <el-card class="card-in-profile-details flex justify-center align-center pointer">
                    <!-- <game-preview :game="game"></game-preview> -->
                    <img :src="game.src" class="image-card">
                    <div style="padding: 14px;">
                    <span class="card-game-name">{{game.name}}</span>
                    <div class="bottom clearfix">
                        <li class="game-category-preview capitalize"><span>Category: </span> {{game.category}}</li>
                        <time class="time">{{ game.addedAt | getDate }}</time>
                    </div>
                    </div>
                   
                        <button class="btn icon-btn btn-remove" @click="$emit('remove', game._id)"> <font-awesome-icon icon="coffee" /></button> 
                        <button class="btn icon-btn btn-remove" @click="$emit('remove', game._id)"> <font-awesome-icon icon="trashAlt" /></button> 
                        <!-- <button class="btn icon-btn btn-remove" @click="$emit('remove', game._id)"><i class="fa fa-trash"></i></button>  -->
                        <router-link tag="button" :to="'/game/edit/'+game._id">Edit</router-link> 
                </el-card>
            </li>
        </ul>
        </div>
    </section>
</template>

<script>
import Header from '@/components/Header.vue';
import GamePreview from '@/components/GamePreview.vue';

export default {
    name: 'ProfileDetails',
    components: {
        Header,
        GamePreview
    },
    data() {
        return {
            labelPosition: 'left',
            isEdit: false,

        }
    },
    created() {
        this.$store.dispatch({ type: "gamesById", games: this.loggedinUser.games });
        console.log('this.loggedinUser.games', this.loggedinUser.games);
        
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedUser || {};
        },
        copiedUser() {
            return JSON.parse(JSON.stringify(this.loggedinUser));
        },
        games() {
            console.log(this.$store.getters.getUserGames);
            return this.$store.getters.getUserGames || [];
        },
    },
    methods: {
        checkIfDisplay() {
            console.log('this.loggedinUser',this.loggedinUser)
            if (!this.loggedinUser) {
                swal({
                title: 'Please login to add your game',
                buttons: ['Not now', 'Login']
                }).then(willLogin => {
                    if (willLogin) {
                        this.$router.push('/login');
                    } else {
                        swal.close();
                    }
                });
            } else this.$router.push('/game/edit');
        },
        saveUserProfile() {
            this.$router.go(-1);
            this.$store.dispatch({ type: 'savedUserProfile', savedUserProfile: this.copiedUser })
                .then(game => {
                    swal('Your details have been saved!',{
                    className: 'swal-text',
                    icon: 'success',
                    timer: 1500,
                    button: false,
                });
                console.log('savedUserProfile from game APP');
                });
        },
        editProfile() {
            console.log('this.loggedinUser in profileDetailes',this.loggedinUser)
            console.log('copiedUser', this.copiedUser);
            this.isEdit = !this.isEdit;
        }
    }
}
</script>

<style scoped lang="scss">
    // @import "~@/assets/scss/style.scss";

    .btn {
        background-color: $main-color;
    }

    .edit-user-profile {
        border: 1px solid $main-color;
        width: rem(500px);
        padding: rem(40px);
    }

    .form-item, .form-input{
        text-transform: capitalize;
    }

    .cards-in-profile-container {
        flex-wrap: nowrap;
        width: 800px;

    }

    .headres-in-profile-details {
        font-size: rem(30px);
        font-family: 'Ubuntu';
        margin-bottom: rem(20px);
    }

    .card-in-profile-details {
        width: rem(250px);
        margin: rem(20px);
        padding: rem(10px);
        transition: all 0.5s;
        height: 400px;
        .image-card {
            width: 100%;
        }
        &:hover {
            transform: scale(0.95, 0.95);
        }
        .card-game-name {
            text-transform: capitalize;
            font-family: 'PaytoneOne';
            font-size: rem(20px);
            color: $main-color;
            // text-shadow: 2px 1px $secondary-color;
        }
    }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }


  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

</style>


   