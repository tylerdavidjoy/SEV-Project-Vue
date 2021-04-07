
<template>
  <v-btn color="green" @click.native="generateReport">Generate <br/> Role Report</v-btn>
</template>

<script>
import axios from 'axios'
import jsPDF  from "jspdf";
export default ({
    name: "RoleReport",
    props:
    {
        selected: String,
        picture: Boolean
    },
    methods: 
    {
    generateReport: function()
    {
        axios.get("http://localhost:3000/person?userType=1")
        .then(response => { 
        if (this.selected == "CSV")
            this.csvCreation(response.data);
        else
            this.pdfCreation(response.data,this.picture);
        })
        .catch(error => {
        console.log(error);
        })
    },

    csvCreation(people)
    {
        var rows = [];
        for(var i=0; i < people.length; i++){
            rows.push([people[i].f_name + " " + people[i].l_name, people[i].email, people[i].value]);
        }

        let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
        
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Role_Report.csv");
        document.body.appendChild(link); 

        link.click();
    },

    pdfCreation: function(people)
        {
            var doc = new jsPDF('p', 'pt');      
                require('jspdf-autotable');
            
                var columns = ["Name", "Email", "Role Type"];
                var rows = [];

                for(var i=0; i < people.length; i++){
                    rows.push([people[i].f_name + " " + people[i].l_name, people[i].email, people[i].value]);
                }
                
                doc.autoTable(columns, rows);
                doc.save('Role_Report.pdf');
        }
    }
})
</script>