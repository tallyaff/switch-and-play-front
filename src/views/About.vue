<template>
  <div class="about">
    <h2 class="prolog">This site was designed and implemented as a final project of Coding Academy bootcamp.
      We used Vue.js framework and combined pure css as well as other libraries. 
      In the backend side, we used Node.js and Mongo DB + Cloudinary to store the data.<br>
      Enjoy our site! Feel free to contact us </h2>
    <h1>meet us:</h1>
    <div class="team-container flex">
      <div class="member-container flex column">
        <div class="user-img" :style="{backgroundImage: tally, 
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
        </div>  
        <h1>Tally Afek</h1>
        <h3>Full Stuck Developer</h3>
        <div class="icons-container flex">
          <a href="https://github.com/tallyaff" target="_blank"><font-awesome-icon icon="at"/> </a> 
          <!-- <a href="https://www.facebook.com/" class="no-cursor" target="_blank"><font-awesome-icon icon="at"/> </a>  -->
          <a href="https://www.linkedin.com/in/tally-affek-7b3a12140/" target="_blank"><font-awesome-icon icon="at"/> </a> 
          <a id="tally-mail" @click="submitMail('tally')" action="mailto:tallyaff@gmail.com" method="post" enctype="text/plain" ><font-awesome-icon icon="at"/> </a> 
        </div>
        <p>After five years of being a QA person,
          I've desided to become a programmer. At my free time I like to cook, travel and dive.
          I hope you will enjoy my portfolio, and would like to hear from you in case you have any suggestions by my Linkdin account.</p>
        <div class="icons-container flex">
          <i><a id="liron-github" class="fa fa-github git" href="https://github.com/LironReshefSteinberger" target="_blank"></a></i>
          <i><a id="liron-mail" class="fa fa-at git" onclick="submitMail('liron')" action="mailto:reshef.liron@gmail.com" method="post" enctype="text/plain"></a></i>
        </div>
      </div>
      <div class="member-container flex column">
        <div class="user-img" :style="{backgroundImage: liron, 
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
        </div>  
        <h1>Liron Reshef-Steinberger</h1>
        <h3>Full Stuck Developer</h3>
        <div class="icons-container flex">
          <a href="https://github.com/LironReshefSteinberger" target="_blank"><font-awesome-icon icon="at"/> </a> 
          <a href="https://www.facebook.com/liron.reshef.1" target="_blank"><font-awesome-icon icon="at"/> </a> 
          <a href="https://www.linkedin.com/in/liron-reshef-steinberger/" target="_blank"><font-awesome-icon icon="at"/> </a> 
          <a id="liron-mail" @click="submitMail('liron')" action="mailto:reshef.liron@gmail.com" method="post" enctype="text/plain"><font-awesome-icon icon="at"/> </a> 
        </div>
        <p>I'm is a Front-End/ Full-Stack developer, a Coding Academy Bootcamp graduate.
          I has experience with writing advanced single page applications using Vue.js & Vuex framwork.
          I earned my M.Sc in Materials and Nanotechnology from Tel Aviv University, and B.Sc. in Chemical Engineering from Shenkar College of Engineering and Design, Israel.
          I studied graphic design to combine it with my hobbies: photography and painting.</p>
      </div>
      <div class="member-container flex column">
        <div class="user-img" :style="{backgroundImage: adi, 
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
        </div>  
        <h1>Adi Gonnen</h1>
        <h3>Full Stuck Developer</h3>
        <div class="icons-container flex">
          <a href="https://github.com/adi-gonnen" target="_blank"><font-awesome-icon icon="at"/> </a> 
          <a href="https://www.facebook.com/adi.shachamgonnen" target="_blank"><font-awesome-icon icon="at"/> </a> 
          <a href="https://www.linkedin.com/in/adi-gonnen/" target="_blank"><font-awesome-icon icon="at"/> </a> 
          <a id="adi-mail" @click="submitMail('adi')" action="mailto:adigonnen@gmail.com" method="post" enctype="text/plain" ><font-awesome-icon icon="at"/> </a> 
        </div>
        <p>Lives in Ramat-Gan. 
          I have M.Sc. in Biocemitry from the Hebrew University and B.Sc in Biotechnology Engineering from Ben gurion university. 
          Worked for 10 years in Nestle Ice Cream as technical lead and project manager.
          I still love ice cream! But,
          I’m starting my journey of transforming from a food engineering expert to a software development specialist, and enjoying every moment in the way!</p>
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {
        liron: `url("img/user/liron.jpg")`,
        tally: `url("img/user/tally.jpg")`,
        adi: `url("img/user/adi.jpg")`,
      }
    },
    methods: {
      submitMail(name) {
        var mail;
        if (name === 'adi') mail = 'adigonnen@gmail.com';
        else if (name === 'tally') mail = 'tallyaff@gmail.com'
        else mail = 'reshef.liron@gmail.com'
        window.location = open(`https://mail.google.com/mail/?view=cm&fs=1&to=${mail}`,"_blank");
      }
    }
  }
</script>
<style scoped lang="scss">
    @import "~@/assets/scss/style.scss";

.user-img {
  width: 200px;
  height: 200px;
  align-self: center;
}
.team-container {
  justify-content: space-around;
   margin: 30px 0;
}

.about {
  margin: 30px auto;
  font-family: "Ubuntu";
  width: 80%;
  h1 {
    text-transform: capitalize;
    margin: 40px;
  }
}

.member-container {
 width: 33%;
 margin: 20px;
 p {
   font-size: 1.3em;
   padding: 15px;
   text-align: left;
 }
 h1 {
   font-size: 1.5em;
   color: $main-color;
   height: 60px;
 }
 h3 {
   padding: 15px;
 }
}

.prolog {
  text-align: left;
  width: 80%;
  margin: auto;
  .contact {
    text-decoration: underline;
  }
}

.prolog:first-child:first-letter {
  float: left;
  font-size: 2.2em;
  line-height: 1em;
  padding: 0 4px;
}

.icons-container {
  justify-content: space-around;
  a {
    font-size: 1.5em;
    cursor: pointer;
  }
}
.no-cursor {
  cursor: none;
}

@media (max-width: 800px){
  .prolog {
    width: 95%;
  }
  .member-container {
     width: 95%;
     margin: 20px;
     h3 {
       line-height: 1em;
      //  width: 100%;
      padding: 10px 0;
     }
  }
}
@media (max-width: 670px){
  .prolog {
    width: 95%;
  }
  .team-container {
    flex-direction: column;
  }
  .member-container {
     width: 95%;
     margin: auto;
     h1 {
       margin: 15px;
       height: 30px;
     }
     p {
       margin-bottom: 30px;
       width: 100%;
       padding: 5px;
     }
  }
}
</style>
