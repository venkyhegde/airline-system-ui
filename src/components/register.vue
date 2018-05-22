<template>
    <v-container fluid fill-height style="padding:.5%">
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
                  <h2>User Registration</h2>
                </div>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="First Name"
                   v-model="userFirstName"
                   :rules="nameRules"
                   required
                ></v-text-field>
              </v-flex>
               <v-flex xs12>
                <v-text-field
                  label="Last Name"
                   v-model="userLastName"
                   :rules="nameRules"
                   required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
               <v-menu
                  ref="menu"
                  lazy
                  :close-on-content-click="false"
                  v-model="menu"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  min-width="290px"
                  :return-value.sync="date"
                >
               <v-text-field
                  slot="activator"
                  label="DOB"
                  v-model="date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
               <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
                </v-menu>
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
                  <v-btn @click="submit" :disabled="!valid" color="success">Create</v-btn>
                  <v-btn @click="clear()" >clear</v-btn>
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
      userFirstName: null,
      userLastName:null,
      userEmail:null,
      password_view: true,
      userPassword: null,
      date: null,
      menu: false,
      modal: false,
      nameRules: [
       v => !!v || 'Name is required'
     ],
     passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 8 || 'Password must be greater than 8 characters'

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
          // formData.append("userName", this.userName);
          // formData.append("userEmail", this.userEmail);
          // formData.append("userPassword", this.userPassword);
          let sendData = {
            "firstName": this.userFirstName,
            "lastName": this.userLastName,
            "email": this.userEmail,
            "password": this.userPassword,
            "address": "",
            "dob": this.date
          }

          axios.post('http://55fb3079.ngrok.io/airline/rest/register',sendData).then(response => {
            console.log(response);
            if(response.data.status.statusCode == "200"){
              this.$router.push('login');
            }
          })
          .catch(e => {
            console.log(e);
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
}
</script>

<style media="screen">
  .upperMargin{
    margin-top: 5%;
  }
</style>
