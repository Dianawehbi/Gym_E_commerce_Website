<?php
ob_start();
if ($_SERVER["REQUEST_METHOD"] == 'POST' && isset($_POST['signup'])) {
    $conn = mysqli_connect('localhost', 'root', '', 'projectweb') or die('Connection Failed' . mysqli_connect_error());

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $cpassword = $_POST['cpassword'];

    if ($password == $cpassword) {
        // Remove the 'id' column from the insert query
        $sql = "INSERT INTO `signup` (`username`, `email`, `password`) VALUES ('$username', '$email', '$password')";
        $query = mysqli_query($conn, $sql);

        if ($query) {
            echo "Data inserted successfully";
            header("Location: home.php");
            exit(); // Ensure no further code is executed after the redirect
        } else {
            echo "Data not inserted";
        }
    } else {
        echo "Your passwords don't match!";
    }

    mysqli_close($conn);
}
ob_end_flush();
?>
<?php
ob_start();
if (isset($_POST["login"])) {
    $username1 = $_POST['username'];
    $password1 = $_POST['password'];

    $conn = mysqli_connect('localhost', 'root', '', 'projectweb') or die('Connection Failed' . mysqli_connect_error());
    $sql = "SELECT * FROM `signup`";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {

        while ($row = mysqli_fetch_assoc($result)) {

            $username = $row['username'];
            $email = $row['email'];
            $password = $row['password'];
        
            echo "<h1>Incorrect Username or Password, please try again</h1>";

            if ($username1 == $username && $password1 ==  $password) {
                header("Location: home.php");
                exit(); // Ensure no further code is executed after the redirect
            }
        }
    } else {
        echo "NO record found";
    }

    mysqli_close($conn);
}
ob_end_flush();
?>



