//Дэлгэцтэй ажиллах контроллер
var uiController = (function(){
    //private data
    var DOMstrings = {
        inputType: ".add__type",
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputAddPtn: '.add__btn'
    }
    return{
        //public service
        getInput : function(){
            return{
                type  : document.querySelector(DOMstrings.inputType).value,
                desc : document.querySelector(DOMstrings.inputDesc).value,
                val : document.querySelector(DOMstrings.inputValue).value
            }
        },
        getDOMstrings : function(){
            return DOMstrings;
        }
        
    }
})();
//Санхүүтэй ажиллах контроллер
var financeController = (function(){
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var data = {
        allItems : {
            inc: [],
            exp: []
        },
        totalItems : {
            inc: 0,
            exp: 0
        }
    }
})();
//Программын холбогч контроллер
var appController = (function(uiController, fnController){
    var ctrlAddItem = (function(){
            //1.oruulah ugugdluudiig delgetsnees olj avna
            console.log(uiController.getInput())
            //2.olj avsan datanuudaa finance cotrollert damjuuulj tend hadgalna
    
            //3.olj avsan datanuudaa web deeree tohiroh hesegt bairluulna
    
            //4.tusuviig tootsoolno
    
            //5.etssiin uldegdel tootsoog delgetsend gargana
        })
    var setupEventListeners = function(){
        var DOM = uiController.getDOMstrings();
        document.querySelector(DOM.inputAddPtn).addEventListener('click',function(){
            ctrlAddItem();
        })
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13) ctrlAddItem();
               
        });
    }
    return{
        init : function(){
            console.log('Application started..');
            setupEventListeners();
        }
    }
    
})(uiController, appController)
appController.init();
