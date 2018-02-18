<template>
    <v-container fluid fill-height style="padding:.5%">
<v-layout
      justify-center
      align-center row
    >
      <v-flex xs4 text-xs-center>
        <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  name="Bucket Name"
                  label="Bucket Name"
                  v-model="bucketName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-btn @click="create()" color="success">Success</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import axios from 'axios'

  export default {
    name: 'createBucket',
    data: () => ({
      bucketName: ''

    }),
    methods:{
      create:function(){
        axios.get(`http://localhost:7000/createNewBucket/`+this.bucketName)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        })


      }
    }
}
</script>
