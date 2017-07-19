var model = {
  names: ["Toby", "Gargalax", "Wendofer", "Dog", "Spot"],
  urls: ["imgs\\cat-1347628091Sbn.jpg", "imgs\\cat-331300091633pgp.jpg", "imgs\\cat-mewing.jpg", "imgs\\cross-eyed-cat.jpg", "imgs\\kitty-cat-1374676578uQX.jpg"],
  catObjArr : [],
};

var octopus = {

  createCatObjArr : function(){
    for(i in model.names){
      model.catObjArr.push({
        name: model.names[i],
        counter: 0,
        display: false,
        id: i,
        url: model.urls[i],
      });
    }
  },

  getCatObjs : function(){
    return model.catObjArr;
  },

  getDisplayCat: function(){
    for(var i = 0; i < model.catObjArr.length; i++){
      if (model.catObjArr[i].display === true){
        return model.catObjArr[i];
      }
    }
  },

  setDisplaycat: function(cat){
    cat.display = true;
  },

  init: function(){
    this.createCatObjArr();
    buttonView.init();
    catDisplay.init();
    adminView.init();
  }
};


/*Handles Rendering and Display of cat picture*/
var catDisplay = {

  init : function(){
    $("#catPictureWrapper").on("click", function(){
      if(octopus.getDisplayCat()){
        var cat  = octopus.getDisplayCat()
        cat.counter++;
        catDisplay.render();
      }
    });
  },

  render : function(){
    var cat  = octopus.getDisplayCat();
    $("#catPictureWrapper").html("<img src ='" + cat.url + "' class = 'catPicture'>");
    $("#score").html("<p> Score: " + cat.counter + "</p>");
  },
};


/* handles generation of buttons and adding funcitons to them*/
var buttonView = {

  init: function (){
    $("#catList").html("");
    this.generateButtonsHTML();
  },

  generateButtonsHTML: function(){
    var catObjs = octopus.getCatObjs();
    for(var i = 0; i < catObjs.length; i++){

      cat = catObjs[i];

      var elem = document.createElement("button");
      elem.textContent = cat.name;

      elem.addEventListener("click", (function(catCopy){
        return function(){
          if(octopus.getDisplayCat()){
            octopus.getDisplayCat().display = false;
          }
          octopus.setDisplaycat(catCopy);
          catDisplay.render();
        }
      })(cat));

      $("#catList").append(elem);
    }
  },

};

var adminView = {

  init : function(){
    this.adminButton();
  },

  adminView : false,

  adminButton : function(){
    $("#toggleAdmin").on("click", function(){
      if(this.adminView === false){
        $("#adminview").append("<form id='updateCatInfo'>");
        $("#adminView").append("Cat Name:<br> <input type='text' id='catName'><br>");
        $("#adminView").append("Image Source:<br> <input type='text' id='imageSource'><br>");
        $("#adminView").append("Score:<br> <input type='text' id='scoreUpdate'><br>");
        $("#adminView").append("<input type='submit' value='Submit' id = 'submit'></form>")
        $("#submit").click(function(){
          var cat = octopus.getDisplayCat();
          console.log($("#catName").val());
          if($("#catName").val()){
            cat.name = $("#catName").val();
            console.log("catName")
          }
          if($("#imageSource").val()){
            cat.url = $("#imageSource").val();
          }
          if($("#scoreUpdate").val()){
            if($("#scoreUpdate").val() % 1 === 0){
              cat.counter = $("#scoreUpdate").val();
            }
          }
          buttonView.init();
          catDisplay.render();
        });
        this.adminView = true;
      } else{
        this.adminView = false;
        $("#adminView").html("");
      }
    });
  },
}

$(document).ready(function(){
  octopus.init();
});
