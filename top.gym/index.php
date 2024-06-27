<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log In</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/stylelogin-signup.css">
</head>

<body>

    <div class="container">
        <h1>Welcome Back</h1>

        <div class="register">
            <p>Enter your credential to login</p>

        </div>
        <form action="connect.php" method="post">
            <input type="text" placeholder="Username" name="username" required class="form-control input-box"><br>
            <input type="password" placeholder="Password" name="password" required class="form-control input-box"><br>
            <button type="submit" class="btn btn-primary" name="login">Login</button>
        </form>
        <div class="register">
            <p><a href="">Forget password?</a></p>
        </div>
        <div class="register">
            <p>Dont have an account? <a href="signup.php">sign Up</a></p>
        </div>
    </div>

</body>

</html>