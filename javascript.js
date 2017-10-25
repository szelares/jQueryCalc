$(document).ready(function(){
  var input = [];
  var calculation = [];
  var inputStr;
  var point = ['.'];
  var operators = ['+','-','*','/'];
  var num = ['0','1','2','3','4','5','6','7','8','9'];
  var score;
              
  function update(){
    if(input.length<=10){
     $('#steps').html(input);
     $('#calculation').html(calculation);
   }else if(input.length>10){
     $('#steps').html('Digit Limit Met');
     $('#calculation').html('');}
  }
  function dlm(){
    if(input.toString().length<=10){
     $('#steps').html(input);
     $('#calculation').html(calculation);
   }else if(input.toString().length>10){
      $('#steps').html('0');
      $('#calculation').html('Digit Limit Met');}
  }
  function delAll(){
    score = 0;
    calculation = [];
    input = [];
    $("#steps").html('0');
    $('#calculation').html('');
  }
  function operandus(sign){
    if(calculation[calculation.length-1]==='='){
      calculation =[];
      calculation.push(input);
      $('#steps').html(sign);
      $('#calculation').html(calculation);
    }
    else{input = [];
    $('#steps').html(sign);
    $('#calculation').html(calculation);
        }
  }
  function pointer(sign){
    if(input.includes(sign) === false){
     input.push(sign);
     calculation.push(sign);
     update();
   }else if(input.includes(sign) === true){
     update();}
  }
  function cancel(){
    if(calculation[calculation.length-1] === '='){
     delAll();
   }else if(input.length > 0){
     calculation.splice(calculation.length - input.length, input.length);
     input = [];
     $('#steps').html('0');
     $('#calculation').html(calculation);
   }else if(input.length === 0 && operators.includes(calculation[calculation.length-1])){
     calculation.pop();
     $('#steps').html('0');
     $('#calculation').html(calculation);
   }else if(input.length === 0){
     delAll();}
  }
  function getTotal(){
   inputStr = calculation.join("");
   score = eval(inputStr);
    input = score;
   if(input.toString().indexOf('.') === -1){
    input = input; 
  }else if(input.toString().indexOf('.') !== -1){ 
    input = input.toFixed(2);} 
    console.log(calculation);
  }

  $(":button").on('click', function(){
   if($(this).val() == "AC"){
    delAll();
  }else if($(this).val() == "CE"){
    cancel();     
  }else if($(this).val() == "="){
    getTotal();
    calculation.push($(this).val());
    dlm();
  }else if($(this).val() == "."){
    pointer($(this).val());
  }else if(operators.includes($(this).val())){ 
    operators.includes(calculation[calculation.length-1]) ? calculation.pop().push($(this).val()) : calculation.push($(this).val());
    calculation[calculation.length-2] === '=' ? calculation = [score+($(this).val())] : console.log('no');
    operandus($(this).val());  
  }else if($(this).val() == "00"){
    if(num.includes(calculation[calculation.length - 1])){
      input.push($(this).val());
      calculation.push($(this).val());
      update();
    }else{
      input.push('0');
      calculation.push('0');
      update();
    }
  }
    else {input.push($(this).val());
      calculation.push($(this).val());
      update();
   }
  });
});