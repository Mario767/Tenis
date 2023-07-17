<template>
  <div class="login-form">
    <v-alert v-if="showAlert" type="error" dismissible class="alert">Podaci nisu ispravno uneseni</v-alert>
    <v-alert v-if="showSuccess" type="success" dismissible class="alert">Uspješno ste se prijavili</v-alert>
    <v-container class="form-container">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="form-card" v-show="showForm">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="First name" required v-model="first_name"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Last name" required v-model="last_name"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Email" required v-model="email" :rules="emailRules"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select :items="['0-18', '19-29', '30-54', '54+']" label="Age" required v-model="age"></v-select>
                  </v-col>
                  <v-col cols="12" class="about-button-col">
                    <v-btn color="white" class="about.title blue--text" @click="showAbout = true">About</v-btn>
                    <v-btn color="blue darken-1" text @click="saveSubscription">
                      Subscribe
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="showAbout" max-width="500">
      <v-card>
        <v-card-title class="about-title">O projektu</v-card-title>
        <v-card-text>
          <br>
          <p>Projekt je napravljen na temu tenisa.</p>
          <p>Za prikaz tenisača i rezultata teniskih mečeva korišten je RapidAPI.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showAbout = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      showAlert: false,
      showSuccess: false,
      showForm: true,
      showAbout: false,
      emailRules: [
        (v) => !!v || 'Email je obavezan',
        (v) => /.+@.+\..+/.test(v) || 'Email mora biti ispravnog formata', // Provjera e-mail formata
      ],
    };
  },
  methods: {
    saveSubscription() {
      if (
        this.first_name === '' ||
        this.last_name === '' ||
        this.age === '' ||
        this.email === ''
      ) {
        this.showAlert = true;
        return;
      }

      // Reset form values
      this.first_name = '';
      this.last_name = '';
      this.age = '';
      this.email = '';

      // Show success message
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    },
  },
};
</script>

<style>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
}

.form-container {
  overflow: auto;
}

.form-card {
  background-color: #f7f7f7;
  margin-bottom: 20px;
  padding: 20px;
}

.about-button-col {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.about-title {
  background-color: #2686f5;
  color: #fdfdfd;
  padding: 16px;
}

.alert {
  width: 300px;
  margin: 20px auto;
}

.v-snack__content {
  color: #ffffff;
}
</style>
