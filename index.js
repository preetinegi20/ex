//db.php--------
<?php
$servername= "localhost";
$username= "root";
$db= "mydb";
$password= "";
$conn= new mysqli($servername, $username, $password, $db );
if($conn->connect_error){
    die("connection failed");
}

else{
    // echo("db connected");
}
?>


//home.php------
<?php
include "db.php";
session_start();
if(!isset($_SESSION['username'], $_SESSION['email'])){
header("location: index.html");
exit;
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq"
      crossorigin="anonymous"
    ></script><link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
	<div class="row">
		 <h2>Your Profile</h2>
        
        
       <div class="col-md-7 ">
<div class="panel panel-default">
  <div class="panel-heading">  <h4 >User Profile</h4></div>
   <div class="panel-body">
       
    <div class="box box-info">
        
            <div class="box-body">
                     <div class="col-sm-6">
                     <div  align="center"> <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" class="img-circle img-responsive"> 
                
                <input id="profile-image-upload" class="hidden" type="file">
<div style="color:#999;" >click here to change profile image</div>
                     </div>
              <br>
            </div>
            <div class="col-sm-6">
            <h4 style="color:#00b1b1;"><?php echo $_SESSION['username'] ; ?> </h4></span>
              <span><p>Developer</p></span>            
            </div>
            <div class="clearfix"></div>
            <hr style="margin:5px 0 5px 0;">
<div class="col-sm-5 col-xs-6 title " >Email:</div><div class="col-sm-7"><?php echo $_SESSION['email'] ;?></div>

                <button type="submit"  class="bt btn btn-danger">Logout</button>
<button type="button" class="btn bt btn-warning">Update</button> 
   </div>
</div>      
</body>
</html>



//index.html---------
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h2 class="text-center text-dark mt-5">Login Form</h2>
          <div class="card my-5">
            <form class="card-body" method="post" action="login.php">
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="Username"
                  name="username"
                  aria-describedby="emailHelp"
                  placeholder="User Name"
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  id="password"
                  placeholder="password"
                />
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-color px-5 mb-5 w-100">
                  Login
                </button>
              </div>
              <div id="emailHelp" class="form-text text-center mb-5 text-dark">
                Not Registered?
                <a href="signup.html" class="text-dark fw-bold">
                  Create an Account</a
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>



//login.php
<!-- get userinput
fetch data from DB
check if username and pass mb_ereg_match
show login success or fails -->

<?php
include "db.php";
session_start();
if(isset($_POST['username'], $_POST['password'])){
    $username= $_POST['username'];
    $password= $_POST['password'];
    $query= "SELECT * FROM users WHERE username = ?";
    //prepare statemenets to check if the username is found
$stmt= $conn->prepare($query); //prepare is used to avoid sql injection it treats sql command as simply string
$stmt->bind_param("s", $username); // "s" means string and "ss" means 2 strings similarly "i" means integer
$stmt->execute();
$result= $stmt->get_result();

//check if username exist
if($result->num_rows===1) //get how many of rows is found
{
    $rows= $result->fetch_assoc();

    //check if pass matches
    if(password_verify($password, $rows['password'])){
        $_SESSION['username']= $rows['username'];
        $_SESSION['email']= $rows['email'];
        header("Location: home.php");
    }
    else{
        echo "incorrect pass";
    }
}
else{
    echo "username not found";
}

}
?>

//signup.html
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="styles.css" />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card">
            <h2 class="card-title text-center">Register</h2>
            <div class="card-body py-md-4">
              <form _lpchecked="1" method="POST" action="signup.php">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="username"
                    placeholder="Name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>

                <div
                  class="d-flex flex-row align-items-center justify-content-between"
                >
                  <button type="submit" class="btn btn-primary">Signup</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>


//signup.php
<?php
include "db.php";
if(isset($_POST['username'])){
    $username= $_POST['username'];
    $email= $_POST['email'];
    $password= $_POST['password'];
    $hashed_pass= password_hash($password, PASSWORD_DEFAULT);
    $query= "insert into users(username, email, password) VALUES (?, ?, ?)";
    $stmt= $conn->prepare($query);
    $stmt->bind_param("sss", $username, $email, $hashed_pass);
    $stmt->execute();//works same as mysqli_query($conn, $query);

    header("Location: index.html");
exit; 
}
else{
    echo "name is not found";
}
?>



// styles

input.hidden {
  position: absolute;
  left: -9999px;
}

#profile-image1 {
  cursor: pointer;

  width: 100px;
  height: 100px;
  border: 2px solid #03b1ce;
}
.title {
  font-size: 16px;
  font-weight: 500;
}
.bot-border {
  border-bottom: 1px #f8f8f8 solid;
  margin: 5px 0 5px 0;
}
.bt {
  margin-top: 1rem;
}









