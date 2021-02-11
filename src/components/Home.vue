<template>
  <div class="main">
    <h1 style="font-size:60px">Home Page</h1>
    <p>{{user.name}}</p>
    <button v-on:click="planPage()">PlanPage</button>
    <div>
      <select v-model="selected"
      @change="sort()" style="margin:10px; height:20px">
        <option disabled value="">Sort</option>
        <option>Course: A-Z</option>
        <option>Course: Z-A</option>
        <option>Professor: A-Z</option>
        <option>Course: Asc#</option>
      </select>

      <input type="text" v-model="search" placeholder="Search" style="width: 40%; height: 30px"/>
      <button v-on:click="searchItem()" style="width:7%; height: 36px; margin:10px;">Search</button>
      <button v-on:click="addNew(true)" style="width:4%; height: 25px; margin:10px;"> Add +</button>
      <button v-on:click="viewStudents()" style="width:4%; height: 25px; margin:10px;">Students</button>
    </div>

    <div v-for="(data,index) in courses" :key='index'>
      <button class="list" v-on:click="view(data.Course_Number)">
        <tbody>
          <tr> 
            <td class="list-content-large">{{data.Course_Name}}</td>
            <td></td>
            <td style="color:#C0C0C0">______</td>
            <td class="list-content-small">Credits: {{data.Course_Credit}}</td>
          </tr>

          <tr> 
            <td class="list-content-large">{{data.Course_Number}}</td>
            <td></td>
            <td style="color:#C0C0C0">______</td>
            <td class="list-content-small" v-if="data.Course_Semester != '' " >{{data.Course_Semester}}</td>
            <td class="list-content-small" v-else >Semester: TBD</td>
          </tr>

          <tr> 
            <td></td>
            <td></td>
            <td style="color:#C0C0C0">______</td>
            <td class="list-content-small" v-if="data.Course_Start_Time != NULL">{{data.Course_Start_Time}}</td>
            <td class="list-content-small" v-else>Time: TBD</td>
          </tr>

          <tr> 
            <td></td>
            <td></td>
            <td style="color:#C0C0C0">______</td>
            <td class="list-content-small">{{data.Course_Room}}</td>
          </tr>

          <tr> 
            <td></td>
            <td></td>
            <td style="color:#C0C0C0">______</td>
            <td class="list-content-small">{{data.Course_Professor_Full_Name}}</td>
          </tr>

          <tr> 
            <td class="list-content-description" v-if="data.Course_Description != '' ">{{data.Course_Description}} </td>
            <td class="list-content-description" v-else >No Course Description</td>
          </tr>

        </tbody>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Courses",
  data() {
    return {
      courses: [],
        hover: false,
        search: "",
        selected: "",
        user: window.user
      }
    },
    methods: {
        view: function(courseID){
            if(this.$router.params.semester){
                this.$router.push({name: 'plan', params: {id:courseID, semester:this.$router.params.semester}})
            }
            else{
              this.$router.push({name: 'Edit', params: {id:courseID, new:false}})
            }
          },
        addNew: function(){
          this.$router.push({name: 'New', params: {new:true}})
          },
          viewStudents: function(){
          this.$router.push({name: 'StudentList'})
          },
          searchItem: function(){
            var url = "";
              if(this.search.length < 2)
              {
                url = "http://team2.eaglesoftwareteam.com/courses";
              }
              if(this.search.length == 4){ //If we need to search for a department
                url = "http://team2.eaglesoftwareteam.com/courses?filterType=dept&filterBy=" + this.search;
              }
              else { //Test to see if a course matches
                url = "http://team2.eaglesoftwareteam.com/courses?filterType=name&filterBy=" + this.search;
              }
            axios
            .get(url)
            .then(response => {
              console.log(response.data)
              this.courses = response.data;
              if(this.courses.length == 0) //If we attempted to search for a course and found nothing, search for a professor
              {
                this.searchProf();
              }
            })
            .catch(error => {
              console.log("ERROR: " + error.response)
            })
            console.log(this.courses.length);
          },
          searchProf: function(){
              console.log("Course not found, trying Professor");
              var url = "http://team2.eaglesoftwareteam.com/courses?filterType=prof&filterBy=" + this.search;
            axios
              .get(url)
              .then(response => {
                console.log(response.data)
                this.courses = response.data;
              })
              .catch(error => {
                console.log("ERROR: " + error.response)
              })
          },
          sort: function(){
              var url = "";
              if(this.selected == "Course: A-Z")
                url = "http://team2.eaglesoftwareteam.com/courses?sort=course&order=forwards";
              else if(this.selected == "Course: Z-A")
                url = "http://team2.eaglesoftwareteam.com/courses?sort=course&order=backwards";
              else if(this.selected == "Professor: A-Z")
                url = "http://team2.eaglesoftwareteam.com/courses?sort=prof";
              else if(this.selected == "Course: Asc#")
                url = "http://team2.eaglesoftwareteam.com/courses?sort=number";
            axios
              .get(url)
              .then(response => {
                console.log(response.data)
                this.courses = response.data;
              })
              .catch(error => {
                console.log("ERROR: " + error.response)
              })
          },
          planPage(){
            this.$router.push({name: 'Plan'})
          }
      },
    created() {
    axios
    .get("http://team2.eaglesoftwareteam.com/courses")
    .then(response => {
      console.log(response.data)
      this.courses = response.data;
    })
    .catch(error => {
      console.log("ERROR: " + error.response)
    })
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.list {
  margin-left:auto;
  margin-right:auto;
  margin-bottom: 10px;
  width: 45%;
  border: 6px solid #00D0DD;
  padding: 10px;
  background-color: #C0C0C0;
  text-align: left;
}
.main {
  background-color: #E5E5E5;
  }
.list-content-large{
  color: black;
  font-size: 20px;
  }
  .list-content-small{
  color: black;
  font-size: 16px;
  margin-left:30%;
  }
  .list-content-description{
  border: 2px solid black;
  background-color: white;  
  color: black;
  font-size: 15px;
  width:80%;
  margin-right:10px;
  }
  .listHighlight{
    background-color: #9E9E9E;
    }
  button {
  background-color: #00D0DD;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  padding: 0px 0px;
}
select {
  background-color: #00D0DD;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
input, label{
  padding: 0px;
}
</style>