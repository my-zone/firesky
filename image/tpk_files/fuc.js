function url_search(search){
    var json=[];
    if(search==""){
        json["upg"]="";
    return json;
    }
    var str=search.substring(1);
    var ar=str.split("&");
    for(i=0;i<ar.length;i++){
        var tstring=ar[i].split("=");
        var tmparray=[];
        json[tstring[0]]=tstring[1];
    }
    return json;
}
function get_csv(csv,data_index){
    var string=csv;
    var spilt_csv=csv.split(/\r\n|\n/);
    var array=[];
    for (i in spilt_csv){
        var tmp=spilt_csv[i].split(',');
        var tmpa=new Array();
        for( j in data_index){
            tmpa[data_index[j]]=tmp[j];
        }
        array.push(tmpa);
    }
        return array;
}