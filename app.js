//Дэлгэцтэй ажиллах контроллер
var uiController = (function(){
    //private data
    var DOMstrings = {
        inputType: ".add__type",
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputAddPtn: '.add__btn',
        listIncome: '.income__list',
        listExpense: '.expenses__list'
    }
    return{
        //public service
        getInput : function(){
            return{
                type  : document.querySelector(DOMstrings.inputType).value,
                desc : document.querySelector(DOMstrings.inputDesc).value,
                val : Math.round(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        getDOMstrings : function(){
            return DOMstrings;
        },
        clearFields : function(){
            var fields = document.querySelectorAll(DOMstrings.inputDesc+ ',' + DOMstrings.inputValue);
            var fieldsArr = Array.prototype.slice.call(fields);
            //convert list to array
            fieldsArr.forEach(function(el, index, array){
                el.value = '';
            })
            fieldsArr[0].focus();
        },
        addListItem: function(item, type){
            // орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ.
            var html, list;
            if(type === 'inc'){ 
                list = DOMstrings.listIncome;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }else{
                list = DOMstrings.listExpense;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>';
            }
            // тэр html дотроо орлого зарлагын утгуудыг replace ашиглан өөрчилнө.
            html = html.replace('%id%', item.id);
            html = html.replace('%description%', item.description);
            html = html.replace('%value%', item.value);
            // бэлтгэсэн html-ээ DOM руу хийж өгнө.
            document.querySelector(list).insertAdjacentHTML("beforeend",html);
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
        items : {
            inc: [],
            exp: []
        },
        totalItems : {
            inc: 0,
            exp: 0
        },
        tusuv: 0,
        huvi:0
    }
    var calculateTotal = function(type){
        var sum = 0;
        data.items[type].forEach(function(el){
            sum = sum + el.value;
        })
        data.totalItems[type] = sum;
        }
    return{
        calculate: function(){
            //niit orlogiin niilberiig tootsoolno
            calculateTotal('inc');
            //niit zarlagiin niilberiig tootsoolno
            calculateTotal('exp');
            //tusuviig shineer tootsoolno
            data.tusuv = data.totalItems.inc - data.totalItems.exp;
            //orlogo zarlagiin huviig tootsoolno
            data.huvi = Math.round((data.totalItems.exp / data.totalItems.inc) *100);

        },
        lastRemain: function(){
            return{
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totalItems.inc,
                totalExp: data.totalItems.exp
            };
        },
        seeData: function(){
            return{
                data
            }
        },
        addItem: function(type,desc,val){
            var item, id;
            if(data.items[type].length === 0)id =1;
            else{
                id = (data.items[type][data.items[type].length - 1].id +1);
            }
            if(type === 'inc'){
                item = new Income(id,desc,val);
            }else{
                item = new Expense(id,desc,val);
            }
            data.items[type].push(item);
            return item;
        }
    }
})();
//Программын холбогч контроллер
var appController = (function(uiController, fnController){
    var ctrlAddItem = (function(){
        //1.oruulah ugugdluudiig delgetsnees olj avna
        var input = uiController.getInput();
        if(input.desc !== '' && input.val !== ''){
            //2.olj avsan datanuudaa finance cotrollert damjuuulj tend hadgalna
            var item = financeController.addItem(input.type, input.desc, input.val);
            //3.olj avsan datanuudaa web deeree tohiroh hesegt bairluulna
            uiController.addListItem(item, input.type);
            uiController.clearFields();
            //4.tusuviig tootsoolno
            financeController.calculate();
            //5.etssiin uldegdel 
            var uldegdel = financeController.lastRemain();
            //6.Tootsoog delgetsend gargana
            console.log(uldegdel);

        }else alert('Тайлбар болон утгаа хамт оруулна уу.');
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
    
})(uiController, financeController)
appController.init();
