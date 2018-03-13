function check()

{
    var name = document.getElementById("name").value;
if(name.value  && psw.value)
{

  alert("You're signed in");


  document.write("Logged In" + name);


}
else
{

 alert("Wrong Password or Username");

}


}