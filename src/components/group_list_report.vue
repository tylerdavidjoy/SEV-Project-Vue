
<template>
  <v-btn color="green" @click.native="generateReport()">Generate <br/> Group List Report</v-btn>
</template>

<script>
import axios from 'axios'
import jsPDF  from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default ({
    name: "GroupListReport",
    props:
    {
        selected: String,
        picture: Boolean
    },
    methods: 
    {
        generateReport: function()
        {
            axios.get("http://team2.eaglesoftwareteam.com/group?report=1")
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
            console.log(group)
            var rows = [];
            for(var i=0; i < group.length; i++){
                rows.push([group[i].id, group[i].name, group[i].f_name + " " + group[i].l_name, group[i].value]);
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
                
                var columns = ["ID", "Group Name", "Leader", "Type"];
                var rows = [];

                for(var i=0; i < group.length; i++){
                    rows.push([group[i].id, group[i].name, group[i].f_name + " " + group[i].l_name, group[i].value]);
                }
                var doc = new jsPDF('p', 'pt');
                doc.autoTable(columns, rows);
                doc.save('Group_List.pdf');
            }

            else
            {
                var picture = new Image();
                picture.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png";

                //var imgData = 'data:image/jpeg;base64,' + window.btoa("../assets/dog.jpg");
                var contentTemp = [];
                contentTemp.push({text: 'List of Groups\n\n', fontSize:30, alignment: 'center', style:'header'})
                for (i = 0; i < group.length; i++)
                {
                    var tempImg = {
                        columns: [
                            {
                                image: 'sample', //First IMG in row
                                width: 150,
                                height: 150
                            },
                            {}, //Spacing
                            {
                                image: 'sample', //Second IMG in row
                                width: 150,
                                height: 150
                            },
                            {}, //Spacing
                            {
                                image: 'sample', //Third IMG in row
                                width: 150,
                                height: 150
                            }
                        ]
                    }

                    var tempNames = {
                        fontSize: 20,
                        alignment: 'center',
                        columns: [
                            {
                                text:group[i].name + "\n" +group[i].f_name + " " + group[i].l_name
                            },
                                //Spacing
                            {
                                text:group[i + 1].name + "\n" + group[i + 1].f_name + " " + group[i + 1].l_name
                            },
                                //Spacing
                            {
                                text:group[i + 2].name + "\n" + group[i + 2].f_name + " " + group[i + 2].l_name
                            }
                        ]
                    }

                    contentTemp.push(tempImg);
                    contentTemp.push(tempNames);
                    i +=2;
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