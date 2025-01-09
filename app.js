//Дэлгэцтэй ажиллах контроллер
var uiController = (function(){
    //private data
    var x = 100;
    
    //private function
    function add(y){
        return x+y;
    }
    return{
        publicAdd : function(a){
            b = add(a);
            console.log('Боловсруулсан утга : ' + b);
        }
    }})
//Санхүүтэй ажиллах контроллер
var financeController = (function(){

})();
//Программын холбогч контроллер
var appController = (function(uiController, fnController){
    var ctrlAddItem = (function(){
            //1.oruulah ugugdluudiig delgetsnees olj avna
            console.log('дэлгэцээс өгөгдөл авав.')
            //2.olj avsan datanuudaa finance cotrollert damjuuulj tend hadgalna
    
            //3.olj avsan datanuudaa web deeree tohiroh hesegt bairluulna
    
            //4.tusuviig tootsoolno
    
            //5.etssiin uldegdel tootsoog delgetsend gargana
        })
    
    document.querySelector('.add__btn').addEventListener('click',function(){
        ctrlAddItem();
    })
    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13) ctrlAddItem();
           
    });
    //uiController.publicAdd(100);
})(uiController, appController)
