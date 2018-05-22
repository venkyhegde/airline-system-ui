<template>
    <v-container  fluid fill-height >
<v-layout
      justify-center
      align-center row
    >
      <v-flex xs4 text-xs-center>
        <v-container fluid>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12>
                <div class="text-xs-center">
                  <h2>Login</h2>
                </div>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="E-mail"
                  v-model="userEmail"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                style="color:white"
                 name="Password"
                 label="Enter your password"
                 hint="At least 8 characters"
                 min="8"
                 :append-icon="password_view ? 'visibility' : 'visibility_off'"
                 :append-icon-cb="() => (password_view = !password_view)"
                 v-model="userPassword"
                 :rules="passwordRules"
                 :type="password_view ? 'Password' : 'text'"
                 required
               ></v-text-field>
              </v-flex>


                <v-flex xs12 class="upperMargin" >
                  <v-btn @click="submit" :disabled="!valid" color="success">LOGIN</v-btn>
                  <v-btn @click="register()" >Register</v-btn>
                </v-flex>
                <v-flex xs12 class="upperMargin" >
                  <v-btn @click="" color="primary" >Sign up With Google
                    <v-icon dark right>person</v-icon>

                  </v-btn>
                </v-flex>
            </v-layout>
            </v-form>
          </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
import axios from 'axios'

  export default {
    name: 'register',
    data: () => ({
      valid: true,
      userEmail:null,
      password_view: true,
      userPassword: null,
     passwordRules: [
      v => !!v || 'Password is required',
      // v => v.length >= 8 || 'Password must be greater than 8 characters'

    ],
     emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }),
    methods:{
      submit () {
        if (this.$refs.form.validate()) {
          // var formData = new FormData();
          // formData.append("userEmail", this.userEmail);
          // formData.append("userPassword", this.userPassword);
          // console.log(formData);
          let sendData = {
            "userName": this.userEmail,
            "password": this.userPassword
          }
          console.log(sendData);
          axios.post('http://55fb3079.ngrok.io/airline/rest/login',sendData).then(response => {
            console.log(response.data);

            if(response.data.status.statusCode == "200"){
              // alert("login successful");
              localStorage.setItem("Ar_id", response.data.id)
              localStorage.setItem("Ar_fname", response.data.firstName)
              localStorage.setItem("Ar_lname", response.data.lastName)

              this.$router.push('home');
            }else{
               alert("login not successful");
            }
          })
          .catch(e => {
            console.log(e);
          })
        }
      },
      register () {
        this.$router.push('register');
      }
    }
}
</script>

<style media="screen">
  .upperMargin{
    margin-top: 5%;
    opacity: 1;
  }
  .image{
    background-image: url('../assets/bg.jpg');
    height: 100%;
    background-position: center;
    background-size: cover;
    /* position: relative; */
    color: white;
    font-size: 25px;
  }
  .textStyle{
    font-family: "Courier New", Courier, monospace;
  }

</style>
