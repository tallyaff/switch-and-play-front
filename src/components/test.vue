  <ul v-if="allFilterTypes">
                        <li v-for="oneType in allFilterTypes"> 
                          <div>{{oneType}}</div>
                        </li>
                      </ul>

                        // allFilterTypes: null,
        // allFilterCategories: null,

          created() {    
    //   var self = this;
    //   this.setFilter = debounce(() => {
    //     console.log('setFilter in gameFilter cmp');
        
    //     self.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy })
    // }, 2000)
      this.allFilterTypes = this.$store.getters.types;
      console.log('allFilterTypes in home', this.allFilterTypes); 
      this.allFilterCategories = this.$store.getters.categories;
      console.log('allFilterCategories in home', this.allFilterCategories); 
  },