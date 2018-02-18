<template>
    <v-container fluid  style="padding:.5%;height:100%">
      <v-layout style="height:30%" row wrap>
      <v-flex xs12  style="padding-left:1%">
        <v-flex style="margin:auto;padding-top:1%" xs4>
          <div class="text-align:center">
             <select v-model="selectedBucket" class="select_box" @change="loadFiles()">
               <option v-for="item in buckets" v-bind:value="item">{{item.name}}</option>
             </select>
        </div>
       </v-flex>
      </v-flex>
      <v-layout xs12 row  wrap style="padding-top:1%" >
        <v-flex xs6 style="text-align:right;" >
          <form xs12 id="myForm" style="padding-top:1%" name="myForm">
            <input type='file' id='fileUpload' name='file'>
          </form>
        </v-flex>
        <v-flex xs6 style="text-align:left;padding-left:6%">
            <v-btn xs2 @click="uploadFile()">Upload</v-btn>
            <div id="placeHolder">
            </div>

        </v-flex>
      </v-layout>
      </v-layout>
      <v-layout style="margin-top:2%" row wrap>
        <v-flex xs6 v-if="getBucketFiles.length==0"  style="padding-left:1%;margin:auto">
          <v-card style="height:60px ">
            <v-layout row>
              <v-flex style="text-align:center;padding-top:3%" xs12>
                <b>No files</b>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      <v-flex xs6 v-if="getBucketFiles.length>0" v-for="file in getBucketFiles" style="padding-left:1%;margin:auto;height:70px">
        <v-card style="height:60px">
          <v-layout row>
            <v-flex style="text-align:center;padding-top:3%" xs6>
            <h3>{{file.filename}}</h3>
            </v-flex>
            <v-flex style="text-align:center;padding-top:0.7%" xs3>
                <v-btn @click="deleteFile(file)" color="error">Delete</v-btn>
            </v-flex>
            <v-flex style="text-align:center;padding-top:0.7%" xs3>
                <v-btn @click="download(file)" color="success">Download</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      </v-layout>

      <v-dialog v-model="dialog" width="600px" >
        <v-btn style="position:relative ;top:15%;right:5%;z-index:99999" fab dark @click="genQR()" color="teal" slot="activator">
         <b>  QR</b>
        </v-btn>
      <!-- <v-btn color="primary" dark slot="activator">Generate QR</v-btn> -->
      <v-card>
        <v-card-title>
          <span class="headline">QR Code for Storjify Bucket : </span>
        </v-card-title>
        <v-card-content>
          <div id="placeHolder"></div>

        </v-card-content>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style media="screen">
body select { display: block; margin: auto;padding: 10px 70px 10px 13px !important; max-width: 100%; height: auto !important; border: 1px solid #e3e3e3; border-radius: 3px; background: url("https://image.ibb.co/iMeAJv/selectbox_arrow.png") right center no-repeat; background-color: #fff; color: #444444; font-size: 12px; line-height: 16px !important; appearance: none; /* this is must */ -webkit-appearance: none; -moz-appearance: none; } /* body select.select_box option */ body select option { padding: 0 4px; } /* for IE and Edge */ select::-ms-expand { display: none; } select:disabled::-ms-expand { background: #f60; }


</style>

<script>

  import axios from 'axios'
  import  {EventBus}  from '@/event-bus.js';

  export default {
    name:'uploadFiles',
    data: () => ({
      buckets:[],
      selectedBucket:null,
      getBucketFiles:[],
      dialog: false
    }),

    methods: {
      loadFiles:function(){
        var that = this
        axios.get(`http://localhost:7000/getBucketFiles/`+this.selectedBucket.id)
        .then(response => {
          that.getBucketFiles = response.data.files
          console.log(that.getBucketFiles);
        })
        .catch(e => {
          console.log(e);
        })
      },
      deleteFile:function(data){
        console.log(data);
        var that = this
        axios.get(`http://localhost:7000/deleteBucketListFile/`+this.selectedBucket.id+'/'+data.id)
        .then(response => {
          console.log(response);
          that.loadFiles();
        })
        .catch(e => {
          console.log(e);
        })
      },
      uploadFile:function(){
        var that =this
        var formData = new FormData();
        var file = document.querySelector('#fileUpload');
        formData.append("file", file.files[0]);
        console.log(formData);
        axios.post('http://localhost:7000/uploadToBucketList/'+this.selectedBucket.id, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
          console.log(response);
          that.loadFiles();
        })
        .catch(e => {
          console.log(e);
        })
      },
      download:function(data){
        window.location.assign(`http://localhost:7000/downloadBucketListFile/`+this.selectedBucket.id+'/'+data.id+'/'+data.filename);
      //   axios.get(`http://localhost:7000/downloadBucketListFile/`+this.selectedBucket.id+'/'+data.id+'/'+data.filename)
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   })
    },
    genQR:function(){
      var typeNumber = 4;
  var errorCorrectionLevel = 'L';
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  console.log(qr);
  qr.addData(this.selectedBucket.id +";"+this.selectedBucket.name);
  qr.make();
  document.getElementById('placeHolder').innerHTML = qr.createImgTag();
    }
    },
    mounted(){

      var that = this
      axios.get(`http://localhost:7000/getBucketList/`)
      .then(response => {
        that.buckets = response.data
        that.selectedBucket = that.buckets[that.buckets.length-1];
        that.loadFiles();
          console.log(that.buckets);
      })
      .catch(e => {
        console.log(e);
      })
    }
  }
</script>
