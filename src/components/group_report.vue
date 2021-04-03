
<template>
  <v-btn color="green" @click.native="generateReport(1)">Generate <br/> Group Memeber Report</v-btn>
</template>

<script>
import axios from 'axios'
import jsPDF  from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default ({
    name: "GroupReportNoImg",
    props:
    {
        selected: String,
        picture: Boolean
    },
    methods: 
    {
    generateReport: function(id)
    {
        axios.get("http://team2.eaglesoftwareteam.com/group?id="+id+"&get_members=1")
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

    csvCreation(group)
    {
        var rows = [];
        for(var i=0; i < group.length; i++){
            rows.push([group[i].f_name + " " + group[i].l_name, group[i].occupation, group[i].employer, group[i].email]);
        }

        let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
        
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "group.csv");
        document.body.appendChild(link); 

        link.click();
    },


    pdfCreation: function(group, img)
        {
            if(!img)
            {     
                require('jspdf-autotable');
                
                var columns = ["Name", "Occupation", "Employer", "Email" ];
                var rows = [];

                for(var i=0; i < group.length; i++){
                    rows.push([group[i].f_name + " " + group[i].l_name, group[i].occupation, group[i].employer, group[i].email]);
                }
                var doc = new jsPDF('p', 'pt');
                doc.autoTable(columns, rows);
                doc.save('Group_Report.pdf');
            }

                       else
            {
                var picture = new Image();
                picture.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png";

                //var imgData = 'data:image/jpeg;base64,' + window.btoa("../assets/dog.jpg");
                var contentTemp = [];
                contentTemp.push({text: 'Group Members\n\n', fontSize:30, alignment: 'center', style:'header'})
                for (i = 0; i < group.length; i++)
                {
                    var tempImg = {
                        columns: [
                            {
                                image: 'sample', //First IMG in row
                                width: 75,
                                height: 75
                            },
                            {}, //Spacing
                            {
                                text:group[i].f_name + " " + group[i].l_name + "\n" + group[i].email,
                                fontSize: 15,
                            }
                        ]
                    }
                    contentTemp.push(tempImg);
                }

                var pdfContent = {
                    content: contentTemp,
                    images:{
                        sample: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"
                    }
                }
                pdfMake.createPdf(pdfContent).open();
                // doc.setFontSize(20);
                
                // for(i = 0; i < people.length; i++)
                // {
                //     doc.text(people[i].f_name + " " + people[i].l_name, (35 + (i % 4) * 50), (50 + (i % 4) * 70))
                //     doc.addImage(imgData,"JPEG", 15,40,60,60);
                // }
                // doc.save('Directory.pdf');
            }
        }
    }
})
</script>