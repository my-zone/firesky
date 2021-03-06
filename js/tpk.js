var tpk=angular.module("tpk",[]);
var tpk_border="./page/";
var usearch=url_search(window.location.search);
var tpk_url=(usearch.upg!="")?usearch.upg:"index";
var index_show_img;
tpk.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                $(this).parents(".tpk_photo").removeClass("hide");
            });
            element.bind('error', function(){
                
            });
        }
    };
});
tpk.controller("tpk_all",function ($scope,$http){
    var chn=false;
    $scope.ch=function (){
       $(".sub-menu-back").show();
    };
    $scope.ch2=function (){
        if(chn==false){
        $(".sub-menu-back").hide();
        }  
    };
    $scope.ch3=function (){
        chn=true;
        console.log(chn);
    };
    $scope.ch4=function (){
        chn=false;
        $(".sub-menu-back").hide();
    };
    
    
    $("#tpk_show_modal").hide();
    $http.get("data/menu.csv").success(function (data){
        $(".se-pre-con").hide();
        var t_menu=get_csv(data,["name","upg","func"]);
        var a=[];
        for(t in t_menu){
            var tmp=t_menu[t];
            if(tmp.upg!="index"){
                a.push({name:tmp.name,url:"?upg="+tmp.upg+"&context="+tmp.func});
            }else{
                a.push({name:tmp.name,url:"index.html"});
            }
        }
         $scope.tpk_menu=a;
    })
    $scope.menu="sd";
    $scope.tpk_show=tpk_border+tpk_url+".html";
    
    
});
tpk.controller("tpk_index",function ($scope,$http){
    $http.get("data/menu.csv").success(function (data){
        var csv=get_csv(data,["name","upg","func","image",'show']);
            var a=[];
        for (i in csv){
            var ts=csv[i];
            //console.log(ts)
            if(ts.show!='N'){
            var tmp={"name":ts.name,image:ts.image,context:[]};
            $.ajax({
                url : 'data/sub_menu/'+ts.func+".csv",
                cache : false, 
                async : false,
                type : "get",
                dataType : 'html',
                success : function (result){
                   var tts=get_csv(result,["name","url"]);
                    var ttmp=[];
                    for(k in tts){
                        var tzp=tts[k];
                        ttmp.push({name:tzp.name.substring(0,5),url:"?upg="+ts.upg+"&context="+ts.func+"&sub="+tzp.url})
                    }
                    tmp['context']=ttmp;
                }
            });
            a.push(tmp);
        }
               }
          $scope.index_show_image=a;
    })
    
    $scope.show_detailed=function (){
    }
})
tpk.controller("tpk_public",function ($scope){
    active_page();
    $scope.upg=tpk_url;
    $scope.func_html="data/public/"+usearch['sub']+".html";
})
tpk.controller("tpk_sub-menu",function ($scope,$http){
    var t=[];
    $http.get("data/sub_menu/"+usearch['context']+".csv").success(function (data){
        var t=get_csv(data,["name","url"]);
        var a=[];
        for(i in t){
            var tmp=t[i];
            a.push({name:tmp.name,url:"?upg="+usearch['upg']+"&context="+usearch['context']+"&sub="+tmp.url,select:tmp.url})
        }   
        if(usearch['sub']==undefined||usearch['sub']==""){  
            a[0]['isActive']=true;
        }else{
            for(i in a){
                if(a[i]['select']==usearch['sub']){
                    a[i]['isActive']=true;
                }
            }
        }
        $scope.sub_menu=a;
    })
     $scope.func_html="data/"+usearch['context']+".html";
   

});

tpk.controller("tpk-photo-menu",function ($scope,$http){
    var t=[];
    $http.get("data/"+usearch['context']+".csv",{headers: {
    'Content-Type': undefined
 },}).success(function (allText){
           photo=get_csv(allText,["image","name","sub"]);
           
            //console.log(t[0]["image"])
            if(usearch['sub']==undefined){  
                photo[0]['isActive']=true;
            }else{
                for(i in photo){
                    if(photo[i]['sub']==usearch['sub']){
                        photo[i]['isActive']=true;
                    }
                }
            }
        $scope.sub_menu=photo;
        $scope.upg=usearch['upg'];
        $scope.context=usearch['context'];
        });
    //$scope.sub_menu=t;
    $scope.func_html="data/"+usearch['context']+".html";

});
tpk.controller("banner",function ($scope){
    $scope.index_banner=[
        {src:"banner.png",detailed:"測試",show:"active"},
        {src:"banner.png",detailed:"測試",show:""},
        {src:"banner.png",detailed:"測試",show:""}
    ]
})
tpk.controller("tpk_photo",function ($scope,$http,$location){
 
    
    var photo=[];
    var t=false;
    var photo_show_num=12;
    $scope.loa=function (){
        console.log("a");
        
    }
    if(usearch['sub']==undefined||usearch['sub']==""){
       $.ajax({
                url : "data/"+usearch['context']+".csv",
                cache : false, 
                async : false,
                type : "get",
                dataType : 'html',
                success : function (result){
                   photo=get_csv(result,["image","name","sub","context"]);
                   //console.log(photo[0]['image']="icon/ajax-loader.gif");
                  
                   $scope.photo=photo;
                   $scope.show=false;
                }
            });
    }else{
        $.ajax({
                url : "data/"+usearch['sub']+".csv",
                cache : false, 
                async : false,
                type : "get",
                dataType : 'html',
                success : function (allText){
                    photo=get_csv(allText,["image","name","sub","context"]);
                    for(i in photo){
                        
                        //photo[i]['hide']="none";
                    }
                    t=true;
                    $scope.show=true;
                }
            });
//        for(i=0;i<photo_show_num;i++){
//                photo[i]['hide']="block";
//            }
//        
        $scope.photo=photo;
        $scope.$watch("photo",function (newvalue,oldvalue){
            console.log(newvalue+"/"+oldvalue);
            
            
        });
        
    }
//    var photo=[
//        {image:"page2.png",name:"try",context:"try"},
//         {image:"page2.png",name:"try",context:"try"},
//         {image:"page2.png",name:"try",context:"try"},
//         {image:"page2.png",name:"try",context:"try"}
//    ]
   
    $scope.text_up=function (){
        this.active="photo_text_up";
   }
    $scope.text_leave=function (){
        this.active="";
    }
    $scope.photo_f=function (tmp,image,context){
        if(t){
            $("#tpk_show_modal").show();
            $("#tpk_show_modal .show_location").load("./page/imageshow.html",function (){
                 $("#tpk_show_modal .show_location").find("#show_image_c").attr("src","image/"+image);
                $("#tpk_show_modal .show_location").find(".introduction").html(context)
                $(".dialog-back").mousedown(function (){
                $("#tpk_show_modal").hide();
                })
            });
           
        }else{
            location.href='?upg='+usearch['upg']+"&context="+usearch['context']+"&sub="+tmp;
        
        }
    }
})


